<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use Illuminate\Http\Request;

class BarangController extends Controller
{
    public function index(){
        $barang = Barang::all();

        if(!$barang){
            return response()->json([
                'success' => false,
                'message' => 'Data barang tidak ditemukan!',
            ]);
        }

        return response()->json($barang);
    }

    public function show($id){
        $barang = Barang::find($id);

        if(!$barang){
            return response()->json([
                'success' => false,
                'message' => 'Data barang tidak ditemukan!',
            ]);
        }

        return response()->json($barang);
    }

    public function showByKategori($id){
        $barang = Barang::where('kategori_id', $id)->get();

        if(!$barang){
            return response()->json([
                'success' => false,
                'message' => 'Kategori tidak ditemukan!',
            ]);
        }
        return response()->json($barang);
    }

    public function searchAlat($keywords){
        $barang = Barang::where('kategori_id', 1)->where('nama_barang', 'like', "%$keywords%")->get();

        if(!$barang){
            return response()->json([
                'success' => false,
                'message' => 'Barang tidak ditemukan!',
            ]);
        }

        return response()->json($barang);
    }

    public function searchBahan($keywords){
        $barang = Barang::where('kategori_id', 2)->where('nama_barang', 'like', "%$keywords%")->get();

        if(!$barang){
            return response()->json([
                'success' => false,
                'message' => 'Bahan tidak ditemukan!',
            ]);
        }

        return response()->json($barang);
    }

    public function searchAlatKode($keywords){
        $barang = Barang::where('kategori_id', 1)->where('kode_barang', 'like', "%$keywords%")->get();

        if(!$barang){
            return response()->json([
                'success' => false,
                'message' => 'Barang tidak ditemukan!',
            ]);
        }

        return response()->json($barang);
    }

    public function searchBahanKode($keywords){
        $barang = Barang::where('kategori_id', 2)->where('kode_barang', 'like', "%$keywords%")->get();

        if(!$barang){
            return response()->json([
                'success' => false,
                'message' => 'Bahan tidak ditemukan!',
            ]);
        }

        return response()->json($barang);
    }

    public function paginationAlat($limit){
        $barang = Barang::where('kategori_id', 1)->paginate($limit);

        return response()->json($barang);
    }

    public function paginationBahan($limit){
        $barang = Barang::where('kategori_id', 2)->paginate($limit);

        return response()->json($barang);
    }

    public function store(Request $request){
        $barang = new Barang;
        $barang->kategori_id = $request->kategori_id;
        $barang->kode_barang = $request->kode_barang;
        $barang->nama_barang = $request->nama_barang;
        $barang->jumlah_barang = $request->jumlah_barang;
        $barang->save();

        if ($barang) {
            return response()->json([
                'success' => true,
                'message' => 'Barang berhasil ditambahkan!',
                'data' => $barang
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Barang gagal ditambahkan!',
            ]);
        }
    }

    public function update(Request $request, $id){
        $barang = Barang::find($id);
        $barang->kategori_id = $request->kategori_id;
        $barang->kode_barang = $request->kode_barang;
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
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Barang gagal diupdate!',
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
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Barang gagal dihapus!',
            ]);
        }
    }
}
