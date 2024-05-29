<?php

namespace App\Http\Controllers;

use App\Models\KondisiBarang;
use Illuminate\Http\Request;

class KondisiBarangController extends Controller
{
    public function index(){
        $kondisiBarang = KondisiBarang::with('user','barang','pengembalian')->get();

        if(!$kondisiBarang){
            return response()->json([
                'success' => false,
                'message' => 'Data kondisi barang tidak ditemukan!',
            ]);
        }

        return response()->json($kondisiBarang);
    }

    public function store(Request $request){

        $kondisiBarang = new KondisiBarang();
        $kondisiBarang->user_id = $request->user_id;
        $kondisiBarang->barang_id = $request->barang_id;
        $kondisiBarang->pengembalian_id = $request->pengembalian_id;
        $kondisiBarang->kondisi_barang = $request->kondisi_barang;
        $kondisiBarang->save();

        return response()->json([
            'success' => true,
            'message' => 'Kondisi barang berhasil disimpan',
            'data' => $kondisiBarang
        ]);
    }

    public function update(Request $request, $id){
        $kondisiBarang = KondisiBarang::find($id);

        if(!$kondisiBarang){
            return response()->json([
                'success' => false,
                'message' => 'Data kondisi barang tidak ditemukan!',
            ]);
        }

        $kondisiBarang->user_id = $request->user_id;
        $kondisiBarang->barang_id = $request->barang_id;
        $kondisiBarang->pengembalian_id = $request->pengembalian_id;
        $kondisiBarang->kondisi_barang = $request->kondisi_barang;
        $kondisiBarang->save();

        return response()->json([
            'success' => true,
            'message' => 'Kondisi barang berhasil diubah',
            'data' => $kondisiBarang
        ]);
    }

    public function destroy($id){
        $kondisiBarang = KondisiBarang::find($id);

        if(!$kondisiBarang){
            return response()->json([
                'success' => false,
                'message' => 'Data kondisi barang tidak ditemukan!',
            ]);
        }

        $kondisiBarang->delete();

        return response()->json([
            'success' => true,
            'message' => 'Kondisi barang berhasil dihapus',
        ]);
    }
}
