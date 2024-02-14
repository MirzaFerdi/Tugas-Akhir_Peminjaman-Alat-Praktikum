<?php

namespace App\Http\Controllers;

use App\Models\Peminjaman;
use Illuminate\Http\Request;

class PeminjamanController extends Controller
{
    public function index(){
        $peminjaman = Peminjaman::all();

        return response()->json($peminjaman);
    }

    public function show($id){
        $peminjaman = Peminjaman::find($id);

        return response()->json($peminjaman);
    }

    public function store(Request $request){
        $peminjaman = new Peminjaman;
        $peminjaman->user_id = $request->user_id;
        $peminjaman->barang_id = $request->barang_id;
        $peminjaman->keterangan = $request->keterangan;
        $peminjaman->status = $request->status;
        $peminjaman->tanggal_peminjaman = $request->tanggal_peminjaman;
        $peminjaman->save();

        if($peminjaman){
            return response()->json([
                'success' => true,
                'message' => 'Peminjaman berhasil ditambahkan!',
                'data' => $peminjaman
            ]);
        }
    }

    public function update(Request $request, $id){
        $peminjaman = Peminjaman::find($id);
        $peminjaman->user_id = $request->user_id;
        $peminjaman->barang_id = $request->barang_id;
        $peminjaman->keterangan = $request->keterangan;
        $peminjaman->status = $request->status;
        $peminjaman->tanggal_peminjaman = $request->tanggal_peminjaman;
        $peminjaman->update();

        if($peminjaman){
            return response()->json([
                'success' => true,
                'message' => 'Peminjaman berhasil diupdate!',
                'data' => $peminjaman
            ]);
        }
    }

    public function destroy($id){
        $peminjaman = Peminjaman::find($id);
        $peminjaman->delete();

        if($peminjaman){
            $peminjaman = Peminjaman::find($id);
            return response()->json([
                'success' => true,
                'message' => 'Peminjaman berhasil dihapus!',
            ]);
        }
    }

}
