<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Peminjaman;
use App\Models\Pengembalian;
use App\Events\MyNotificationEvent;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

class PeminjamanController extends Controller
{
    public function index()
    {
        $peminjaman = Peminjaman::with('user', 'barang')->orderByDesc('tanggal_peminjaman')->paginate(8);
        ;

        if (!$peminjaman) {
            return response()->json([
                'success' => false,
                'message' => 'Data peminjaman tidak ditemukan!',
            ]);
        }

        return response()->json($peminjaman);
    }

    public function show($id)
    {
        $peminjaman = Peminjaman::with('user', 'barang')->find($id);

        if (!$peminjaman) {
            return response()->json([
                'success' => false,
                'message' => 'Data peminjaman tidak ditemukan',
            ]);
        }

        return response()->json($peminjaman);
    }

    public function store(Request $request)
    {
        $peminjaman = new Peminjaman;
        $peminjaman->user_id = $request->user_id;
        $peminjaman->barang_id = $request->barang_id;
        $peminjaman->keterangan = $request->keterangan;
        $peminjaman->status = $request->status;
        $peminjaman->tanggal_peminjaman = $request->tanggal_peminjaman;
        $peminjaman->save();


        if ($peminjaman) {
            $message = response()->json([
                'success' => true,
                'id' => 1,
                'message' => 'Ada peminjaman baru!',
                'data' => $peminjaman
            ]);

            event(new MyNotificationEvent($message));

            return response()->json([
                'success' => true,
                'message' => 'Peminjaman berhasil ditambahkan!',
                'data' => $peminjaman
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Peminjaman gagal ditambahkan!',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $peminjaman = Peminjaman::find($id);
        $peminjaman->user_id = $request->user_id;
        $peminjaman->barang_id = $request->barang_id;
        $peminjaman->keterangan = $request->keterangan;
        $peminjaman->status = $request->status;
        $peminjaman->tanggal_peminjaman = $request->tanggal_peminjaman;
        $peminjaman->save();

        if ($peminjaman) {
            return response()->json([
                'success' => true,
                'message' => 'Peminjaman berhasil diupdate!',
                'data' => $peminjaman
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Peminjaman gagal diupdate!',
            ]);
        }
    }

    public function updatePengembalian(Request $request, $id)
    {
        $peminjaman = Peminjaman::find($id);
        $peminjaman->pengembalian_id = $request->pengembalian_id;
        $peminjaman->save();

        if ($peminjaman) {
            return response()->json([
                'success' => true,
                'message' => 'Peminjaman berhasil diupdate!',
                'data' => $peminjaman
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Peminjaman gagal diupdate!',
            ]);
        }
    }

    public function destroy($id)
    {
        $peminjaman = Peminjaman::find($id);
        $peminjaman->delete();

        $barang = Barang::find($peminjaman->barang_id);
        $barang->stok_tersedia = $barang->stok_tersedia + 1;
        $barang->save();

        if ($peminjaman) {
            $peminjaman = Peminjaman::find($id);
            return response()->json([
                'success' => true,
                'message' => 'Peminjaman berhasil dihapus!',
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Peminjaman gagal dihapus!',
            ]);
        }
    }

    public function approve($id)
    {
        date_default_timezone_set('Asia/Jakarta');

        $peminjaman = Peminjaman::find($id);
        $barang = Barang::find($peminjaman->barang_id);

        if (!$peminjaman) {
            return response()->json([
                'success' => false,
                'message' => 'Peminjaman tidak ditemukan!',
            ]);
        }

        if ($barang->stok_tersedia <= 0) {
            return response()->json([
                'success' => false,
                'message' => 'jumlah stok yang tersedia tidak ada!',
            ]);
        }

        if ($peminjaman->status === 'Diterima') {
            return response()->json([
                'success' => false,
                'message' => 'Peminjaman sudah diterima!',
            ]);
        }

        $peminjaman->status = 'Diterima';
        $peminjaman->tenggat_peminjaman = Carbon::now()->addDays(7);
        $peminjaman->save();

        $barang->stok_tersedia = $barang->stok_tersedia - 1;
        $barang->save();


        $message = response()->json([
            'success' => true,
            'id' => 2,
            'message' => 'Peminjaman anda berhasil diterima!',
            'data' => $peminjaman
        ]);

        event(new MyNotificationEvent($message));

        return response()->json([
            'success' => true,
            'message' => 'Peminjaman berhasil diterima!',
            'data' => $peminjaman
        ]);
    }

    public function reject($id)
    {
        $peminjaman = Peminjaman::find($id);
        $peminjaman->status = 'Ditolak';
        $peminjaman->save();

        if ($peminjaman) {

            $message = response()->json([
                'success' => true,
                'id' => 2,
                'message' => 'Peminjaman anda ditolak!',
                'data' => $peminjaman
            ]);

            event(new MyNotificationEvent($message));

            return response()->json([
                'success' => true,
                'message' => 'Peminjaman berhasil ditolak!',
                'data' => $peminjaman
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Peminjaman gagal ditolak!',
            ]);
        }
    }

    public function sortTimestamps($keywords)
    {
        $peminjaman = Peminjaman::with('user', 'barang');

        if ($keywords === 'asc') {
            $peminjaman = $peminjaman->orderBy('tanggal_peminjaman', 'asc')->get();
        } elseif ($keywords === 'desc') {
            $peminjaman = $peminjaman->orderBy('tanggal_peminjaman', 'desc')->get();
        } else {
            return response()->json(['message' => 'Parameter salah. Gunakan "asc" atau "desc"'], 400);
        }

        return response()->json([
            'success' => true,
            'data' => $peminjaman
        ]);
    }

    public function peminjamanByUserId($userId)
    {
        $peminjaman = Peminjaman::with('user', 'barang', 'pengembalian')->where('user_id', $userId)->orderByDesc('tanggal_peminjaman')->paginate(8);

        if ($peminjaman) {

            $message = response()->json([
                'success' => true,
                'id' => 2,
                'message' => 'Peminjaman anda berhasil diterima!',
                'data' => $peminjaman
            ]);

            event(new MyNotificationEvent($message));

            return response()->json([
                'success' => true,
                'message' => 'Data peminjaman ditemukan!',
                'data' => $peminjaman
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data peminjaman tidak ditemukan!',
            ]);
        }

    }

    public function searchPeminjaman($keywords)
    {
        $peminjaman = Peminjaman::with(['user', 'barang'])
            ->where(function ($query) use ($keywords) {
                $query->whereHas('user', function ($query) use ($keywords) {
                    $query->where('nama', 'like', "%$keywords%");
                })->orWhereHas('barang', function ($query) use ($keywords) {
                    $query->where('nama_barang', 'like', "%$keywords%");
                });
            })
            ->get();

        if ($peminjaman->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Peminjaman tidak ditemukan!',
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $peminjaman
        ]);
    }


    public function peminjamanApproved($userId)
    {

        $peminjaman = Peminjaman::with('user', 'barang', 'pengembalian')
            ->where('status', 'Diterima')
            ->where('user_id', $userId)
            ->orderByDesc('tanggal_peminjaman')
            ->paginate(8);

        if ($peminjaman->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak ada transaksi peminjaman yang sudah disetujui oleh admin!',
            ]);
        }

        // Memeriksa setiap record peminjaman untuk kondisi tenggat_peminjaman
        foreach ($peminjaman as $item) {
            $tanggalPeminjaman = Carbon::parse($item->tanggal_peminjaman);
            $tenggatPeminjaman = Carbon::parse($item->tenggat_peminjaman);
            $sekarang = now();

            if ($tenggatPeminjaman->greaterThan($tanggalPeminjaman) && $tenggatPeminjaman->diffInDays($sekarang) < 2) {
                $message = response()->json([
                    'success' => true,
                    'id' => 2,
                    'message' => 'Tenggat peminjaman kurang dari 2 hari!',
                    'data' => $item
                ]);

                event(new MyNotificationEvent($message));
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Data peminjaman ditemukan!',
            'data' => $peminjaman
        ]);
    }

    public function transaksiBulanan($bulan, $tahun)
    {
        $peminjaman = Peminjaman::with('user', 'barang')->whereMonth('tanggal_peminjaman', $bulan)->whereYear('tanggal_peminjaman', $tahun)->get();
        $pengembalian = Pengembalian::with('user', 'barang')->whereMonth('tanggal_pengembalian', $bulan)->whereYear('tanggal_pengembalian', $tahun)->get();

        if ($peminjaman->isEmpty() && $pengembalian->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Data peminjaman tidak ditemukan!',
            ]);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'Data peminjaman ditemukan!',
                'peminjaman' => $peminjaman,
                'pengembalian' => $pengembalian
            ]);
        }
    }

    public function transaksiHarian($hari, $bulan, $tahun)
    {
        $peminjaman = Peminjaman::with('user', 'barang')->whereDay('tanggal_peminjaman', $hari)->whereMonth('tanggal_peminjaman', $bulan)->whereYear('tanggal_peminjaman', $tahun)->get();
        $pengembalian = Pengembalian::with('user', 'barang')->whereDay('tanggal_pengembalian', $hari)->whereMonth('tanggal_pengembalian', $bulan)->whereYear('tanggal_pengembalian', $tahun)->get();

        if ($peminjaman->isEmpty() && $pengembalian->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Data peminjaman tidak ditemukan!',
            ]);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'Data peminjaman ditemukan!',
                'peminjaman' => $peminjaman,
                'pengembalian' => $pengembalian
            ]);
        }
    }
}
