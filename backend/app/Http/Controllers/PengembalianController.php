<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Peminjaman;
use App\Models\Pengembalian;
use App\Models\KondisiBarang;
use App\Events\MyNotificationEvent;
use Illuminate\Http\Request;

class PengembalianController extends Controller
{
    public function index()
    {
        $pengembalian = Pengembalian::with('user', 'barang')->orderByDesc('tanggal_pengembalian')->paginate(8);

        if (!$pengembalian) {
            return response()->json([
                'success' => false,
                'message' => 'Data pengembalian tidak ditemukan!',
            ]);
        }

        return response()->json($pengembalian);
    }

    public function show($id)
    {
        $pengembalian = Pengembalian::with('user', 'barang')->find($id);

        if (!$pengembalian) {
            return response()->json([
                'success' => false,
                'message' => 'Data pengembalian tidak ditemukan',
            ]);
        }

        return response()->json($pengembalian);
    }

    public function store(Request $request)
    {

        $peminjaman = Peminjaman::find($request->peminjaman_id);

        if (!$peminjaman) {
            return response()->json([
                'success' => false,
                'message' => 'Peminjaman tidak ditemukan!',
            ]);
        }

        if($request->jumlah_pengembalian > $peminjaman->jumlah_peminjaman){
            return response()->json([
                'success' => false,
                'message' => 'Jumlah pengembalian melebihi jumlah peminjaman!',
            ]);
        }

        if($request->jumlah_pengembalian < $peminjaman->jumlah_peminjaman){
            return response()->json([
                'success' => false,
                'message' => 'Jumlah pengembalian kurang dari jumlah peminjaman!',
            ]);
        }


        $pengembalian = new Pengembalian;
        $pengembalian->user_id = $request->user_id;
        $pengembalian->barang_id = $request->barang_id;
        $pengembalian->peminjaman_id = $request->peminjaman_id;
        $pengembalian->keterangan = $request->keterangan;
        $pengembalian->status = $request->status;
        $pengembalian->jumlah_pengembalian = $request->jumlah_pengembalian;
        $pengembalian->tanggal_pengembalian = $request->tanggal_pengembalian;
        $pengembalian->save();

        if ($pengembalian) {

            $message = response()->json([
                'success' => true,
                'message' => 'Ada pengembalian baru!',
                'data' => $pengembalian
            ]);

            event(new MyNotificationEvent($message, 1));

            return response()->json([
                'success' => true,
                'message' => 'Pengembalian berhasil ditambahkan!',
                'data' => $pengembalian
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian gagal ditambahkan!',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $pengembalian = Pengembalian::find($id);
        $pengembalian->user_id = $request->user_id;
        $pengembalian->barang_id = $request->barang_id;
        $pengembalian->keterangan = $request->keterangan;
        $pengembalian->status = $request->status;
        $pengembalian->jumlah_pengembalian = $request->jumlah_pengembalian;
        $pengembalian->tanggal_pengembalian = $request->tanggal_pengembalian;
        $pengembalian->save();

        if ($pengembalian) {
            return response()->json([
                'success' => true,
                'message' => 'Pengembalian berhasil diupdate!',
                'data' => $pengembalian
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian gagal diupdate!',
            ]);
        }
    }

    public function destroy($id)
    {
        $pengembalian = Pengembalian::find($id);
        $pengembalian->delete();

        if ($pengembalian) {
            $pengembalian = Pengembalian::find($id);
            return response()->json([
                'success' => true,
                'message' => 'Pengembalian berhasil dihapus!',
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian gagal dihapus!',
            ]);
        }
    }

    public function approve($id)
    {
        $pengembalian = Pengembalian::find($id);

        if (!$pengembalian) {
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian tidak ditemukan!',
            ]);
        }

        if ($pengembalian->status === 'Diterima') {
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian sudah diterima!',
            ]);
        }

        $pengembalian->status = 'Diterima';
        $pengembalian->save();

        $barang = Barang::find($pengembalian->barang_id);
        $barang->stok_tersedia = $barang->stok_tersedia + $pengembalian->jumlah_pengembalian;
        $barang->save();


        $message = response()->json([
            'success' => true,
            'message' => 'Pengembalian anda berhasil diterima!',
            'data' => $pengembalian
        ]);

        event(new MyNotificationEvent($message, $pengembalian->user_id));

        return response()->json([
            'success' => true,
            'message' => 'Pengembalian berhasil diterima!',
            'data' => $pengembalian
        ]);
    }

    public function approveBarangRusak($id)
    {
        $pengembalian = Pengembalian::find($id);

        if (!$pengembalian) {
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian tidak ditemukan!',
            ]);
        }

        if ($pengembalian->status === 'Diterima') {
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian sudah diterima!',
            ]);
        }

        $pengembalian->status = 'Diterima';
        $pengembalian->save();

        $barang = Barang::find($pengembalian->barang_id);
        $jumlahKondisi = KondisiBarang::where('pengembalian_id', $id);
        $barang->stok_tersedia = $barang->stok_tersedia - $jumlahKondisi->jumlah_kondisi;
        $barang->save();


        $message = response()->json([
            'success' => true,
            'message' => 'Pengembalian anda berhasil diterima!',
            'data' => $pengembalian
        ]);

        event(new MyNotificationEvent($message, $pengembalian->user_id));

        return response()->json([
            'success' => true,
            'message' => 'Pengembalian berhasil diterima!',
            'data' => $pengembalian
        ]);

    }

    public function approveBahanHabis($id)
    {
        $pengembalian = Pengembalian::find($id);

        if (!$pengembalian) {
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian tidak ditemukan!',
            ]);
        }

        if ($pengembalian->status === 'Diterima') {
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian sudah diterima!',
            ]);
        }

        $pengembalian->status = 'Diterima';
        $pengembalian->save();

        $barang = Barang::find($pengembalian->barang_id);
        $jumlahKondisi = KondisiBarang::where('pengembalian_id', $id);
        $barang->stok_tersedia = $barang->stok_tersedia - $jumlahKondisi->jumlah_kondisi;
        $barang->stok_awal = $barang->stok_awal -  $jumlahKondisi->jumlah_kondisi;
        $barang->save();

        $message = response()->json([
            'success' => true,
            'message' => 'Pengembalian anda berhasil diterima!',
            'data' => $pengembalian
        ]);

        event(new MyNotificationEvent($message, $pengembalian->user_id));

        return response()->json([
            'success' => true,
            'message' => 'Pengembalian berhasil diterima!',
            'data' => $pengembalian
        ]);
    }

    public function reject($id)
    {
        $pengembalian = Pengembalian::find($id);
        $pengembalian->status = 'Ditolak';
        $pengembalian->save();

        if ($pengembalian) {

            $message = response()->json([
                'success' => true,
                'message' => 'Pengembalian anda ditolak!',
                'data' => $pengembalian
            ]);

            event(new MyNotificationEvent($message, $pengembalian->user_id));

            return response()->json([
                'success' => true,
                'message' => 'Pengembalian berhasil ditolak!',
                'data' => $pengembalian
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian gagal ditolak!',
            ]);
        }
    }


    public function sortTimestamps($keywords)
    {
        $pengembalian = Pengembalian::with('user', 'barang');

        if ($keywords === 'asc') {
            $pengembalian = $pengembalian->orderBy('tanggal_pengembalian', 'asc')->get();
        } elseif ($keywords === 'desc') {
            $pengembalian = $pengembalian->orderBy('tanggal_pengembalian', 'desc')->get();
        } else {
            return response()->json(['message' => 'Parameter salah. Gunakan "asc" atau "desc"'], 400);
        }

        return response()->json([
            'success' => true,
            'data' => $pengembalian
        ]);
    }

    public function pengembalianByUserId($userId)
    {
        $pengembalian = Pengembalian::with('user', 'barang')->where('user_id', $userId)->orderByDesc('tanggal_pengembalian')->paginate(8);

        if ($pengembalian) {
            return response()->json([
                'success' => true,
                'message' => 'Data pengembalian ditemukan!',
                'data' => $pengembalian
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data pengembalian tidak ditemukan!',
            ]);
        }

    }

    public function searchPengembalian($keywords)
    {
        $pengembalian = Pengembalian::with(['user', 'barang'])
            ->where(function ($query) use ($keywords) {
                $query->whereHas('user', function ($query) use ($keywords) {
                    $query->where('nama', 'like', "%$keywords%");
                })->orWhereHas('barang', function ($query) use ($keywords) {
                    $query->where('nama_barang', 'like', "%$keywords%");
                });
            })
            ->get();

        if ($pengembalian->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian tidak ditemukan!',
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $pengembalian
        ]);
    }

    public function pengembalianApproved($userId)
    {
        $pengembalian = Pengembalian::with('user', 'barang')->where('status', 'Diterima')->where('user_id', $userId)->get();

        if ($pengembalian->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Data pengembalian tidak ditemukan!',
            ]);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'Data pengembalian ditemukan!',
                'data' => $pengembalian
            ]);
        }
    }
}
