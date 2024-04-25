<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use Illuminate\Http\Request;

class KategoriController extends Controller
{
    public function index(){
        $kategori = Kategori::all();

        if(!$kategori){
            return response()->json([
                'success' => false,
                'message' => 'Data kategori tidak ditemukan!',
            ]);
        }

        return response()->json($kategori);
    }

    public function show($id){
        $kategori = Kategori::find($id);

        if(!$kategori){
            return response()->json([
                'success' => false,
                'message' => 'Data kategori tidak ditemukan!',
            ]);
        }

        return response()->json($kategori);
    }

    public function store(Request $request){
        $kategori = new Kategori;
        $kategori->nama_kategori = $request->nama_kategori;
        $kategori->save();

        if($kategori){
            return response()->json([
                'success' => true,
                'message' => 'Kategori berhasil ditambahkan!',
                'data' => $kategori
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Kategori gagal ditambahkan!',
            ]);
        }
    }

    public function update(Request $request, $id){
        $kategori = Kategori::find($id);
        $kategori->nama_kategori = $request->nama_kategori;
        $kategori->save();

        if($kategori){
            $kategori = Kategori::find($id);
            return response()->json([
                'success' => true,
                'message' => 'Kategori berhasil diupdate!',
                'data' => $kategori
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Kategori gagal diupdate!',
            ]);
        }
    }

    public function destroy($id){
        $kategori = Kategori::find($id);
        $kategori->delete();

        if($kategori){
            $kategori = Kategori::find($id);
            return response()->json([
                'success' => true,
                'message' => 'Kategori berhasil dihapus!',
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Kategori gagal dihapus!',
            ]);
        }
    }
}
