<?php

namespace App\Http\Controllers;

use App\Models\Notifikasi;
use Illuminate\Http\Request;

class NotifikasiController extends Controller
{

    public function notifikasiByUser($userId)
    {
        $notifikasi = Notifikasi::with('user')->where('user_id', $userId)->orderByDesc('id')->get();

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
        $notifikasi->save();

        return response()->json([
            'message' => 'Notifikasi berhasil disimpan',
            'data' => $notifikasi
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
        $notifikasi = Notifikasi::where('user_id', $userId)->where('dibaca', '0')->get();

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
