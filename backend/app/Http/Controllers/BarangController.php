<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use Illuminate\Http\Request;

class BarangController extends Controller
{
    public function index(){
        $barang = Barang::all();

        return response()->json($barang);
    }

    public function show($id){
        $barang = Barang::find($id);

        return response()->json($barang);
    }

    public function store(Request $request){
        $barang = new Barang;
        $barang->kategori_id = $request->kategori_id;
        $barang->nama_barang = $request->nama_barang;
        $barang->jumlah_barang = $request->jumlah_barang;
        $barang->save();

        if ($barang) {
            return response()->json([
                'success' => true,
                'message' => 'Barang berhasil ditambahkan!',
                'data' => $barang
            ]);
        }
    }

    public function update(Request $request, $id){
        $barang = Barang::find($id);
        $barang->kategori_id = $request->kategori_id;
        $barang->nama_barang = $request->nama_barang;
        $barang->jumlah_barang = $request->jumlah_barang;
        $barang->update();

        if($barang){
            $barang = Barang::find($id);
            return response()->json([
                'success' => true,
                'message' => 'Barang berhasil diupdate!',
                'data' => $barang
            ]);
        }
    }

    public function destroy($id){
        $barang = Barang::find($id);
        $barang->delete();


        if($barang){
            $barang = Barang::find($id);
            return response()->json([
                'success' => true,
                'message' => 'Barang berhasil dihapus!',
            ]);
        }
    }
}
