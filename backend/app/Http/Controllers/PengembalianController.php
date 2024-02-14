<?php

namespace App\Http\Controllers;

use App\Models\Pengembalian;
use Illuminate\Http\Request;

class PengembalianController extends Controller
{
    public function index(){
        $pengembalian = Pengembalian::all();

        return response()->json($pengembalian);
    }

    public function show($id){
        $pengembalian = Pengembalian::find($id);

        return response()->json($pengembalian);
    }

    public function store(Request $request){
        $pengembalian = new Pengembalian;
        $pengembalian->user_id = $request->user_id;
        $pengembalian->barang_id = $request->barang_id;
        $pengembalian->keterangan = $request->keterangan;
        $pengembalian->status = $request->status;
        $pengembalian->tanggal_pengembalian = $request->tanggal_pengembalian;
        $pengembalian->save();

        if($pengembalian){
            return response()->json([
                'success' => true,
                'message' => 'Pengembalian berhasil ditambahkan!',
                'data' => $pengembalian
            ]);
        }
    }

    public function update(Request $request, $id){
        $pengembalian = Pengembalian::find($id);
        $pengembalian->user_id = $request->user_id;
        $pengembalian->barang_id = $request->barang_id;
        $pengembalian->keterangan = $request->keterangan;
        $pengembalian->status = $request->status;
        $pengembalian->tanggal_pengembalian = $request->tanggal_pengembalian;
        $pengembalian->update();

        if($pengembalian){
            return response()->json([
                'success' => true,
                'message' => 'Pengembalian berhasil diupdate!',
                'data' => $pengembalian
            ]);
        }
    }

    public function destroy($id){
        $pengembalian = Pengembalian::find($id);
        $pengembalian->delete();

        if($pengembalian){
            $pengembalian = Pengembalian::find($id);
            return response()->json([
                'success' => true,
                'message' => 'Pengembalian berhasil dihapus!',
            ]);
        }
    }
}
