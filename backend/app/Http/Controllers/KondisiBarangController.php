<?php

namespace App\Http\Controllers;

use App\Models\KondisiBarang;
use App\Models\Pengembalian;
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

        $pengembalian = Pengembalian::find($request->pengembalian_id);

        if($request->jumlah_kondisi > $pengembalian->jumlah_barang){
            return response()->json([
                'success' => false,
                'message' => 'Jumlah kondisi tidak boleh melebihi jumlah barang yang dikembalikan!',
            ]);
        }

        if($request->kondisi_barang = 0){
            return response()->json([
                'success' => false,
                'message' => 'Kondisi barang tidak boleh kosong!',
            ]);
        }

        $kondisiBarang = new KondisiBarang();
        $kondisiBarang->user_id = $request->user_id;
        $kondisiBarang->barang_id = $request->barang_id;
        $kondisiBarang->pengembalian_id = $request->pengembalian_id;
        $kondisiBarang->kondisi_barang = $request->kondisi_barang;
        $kondisiBarang->jumlah_kondisi = $request->jumlah_kondisi;
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
        $kondisiBarang->jumlah_kondisi = $request->jumlah_kondisi;
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
