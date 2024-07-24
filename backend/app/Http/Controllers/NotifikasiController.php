<?php

namespace App\Http\Controllers;

use App\Models\Notifikasi;
use Illuminate\Http\Request;

class NotifikasiController extends Controller
{

    public function byPeminjamanId($peminjamanId)
    {
        $notifikasi = Notifikasi::where('peminjaman_id', $peminjamanId)->first();

        if (!$notifikasi) {
            return response()->json([
                'message' => 'Notifikasi tidak ditemukan!',
            ]);
        }

        return response()->json([
            'message' => 'Notifikasi ditemukan!',
            'data' => $notifikasi
        ]);
    }

    public function byPengembalianId($pengembalianId)
    {
        $notifikasi = Notifikasi::where('pengembalian_id', $pengembalianId)->first();

        if (!$notifikasi) {
            return response()->json([
                'message' => 'Notifikasi tidak ditemukan!',
            ]);
        }

        return response()->json([
            'message' => 'Notifikasi ditemukan!',
            'data' => $notifikasi
        ]);
    }

    public function notifikasiByUser($userId)
    {
        $notifikasi = Notifikasi::with('user')->where('user_id', $userId)->orderByDesc('id')->paginate(8);

        if (!$notifikasi) {
            return response()->json([
                'message' => 'Notifikasi tidak ditemukan!',
            ]);
        }

        return response()->json([
            'message' => 'Notifikasi ditemukan!',
            'data' => $notifikasi
        ]);
    }

    public function store(Request $request)
    {
        $notifikasi = new Notifikasi();
        $notifikasi->user_id = $request->user_id;
        $notifikasi->pesan = $request->pesan;
        $notifikasi->dibaca = '0';
        $notifikasi->tanggal = $request->tanggal;
        $notifikasi->peminjaman_id = $request->peminjaman_id;
        $notifikasi->pengembalian_id = $request->pengembalian_id;
        $notifikasi->save();

        return response()->json([
            'message' => 'Notifikasi berhasil disimpan',
            'data' => $notifikasi,
            'success' => true
        ]);
    }

    public function dibaca(Request $request, $userId, $id)
    {
        $notifikasi = Notifikasi::where('user_id', $userId)->where('id', $id)->first();
        $notifikasi->dibaca = '1';
        $notifikasi->save();

        return response()->json([
            'message' => 'Notifikasi berhasil diubah',
            'data' => $notifikasi
        ]);
    }

    public function belumDibaca($userId)
    {
        $notifikasi = Notifikasi::where('user_id', $userId)->where('dibaca', '0')->paginate(8);

        if (!$notifikasi) {
            return response()->json([
                'message' => 'Notifikasi belum dibaca tidak ditemukan!',
            ]);
        }

        return response()->json([
            'message' => 'Notifikasi belum dibaca ditemukan!',
            'data' => $notifikasi
        ]);
    }

    public function destroy($userId)
    {
        $notifikasi = Notifikasi::where('user_id', $userId);
        $notifikasi->delete();

        return response()->json([
            'message' => 'Notifikasi berhasil dihapus'
        ]);
    }
}
