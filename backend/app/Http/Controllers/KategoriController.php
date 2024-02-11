<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use Illuminate\Http\Request;

class KategoriController extends Controller
{
    public function index(){
        $kategori = Kategori::all();

        return response()->json($kategori);
    }

    public function show($id){
        $kategori = Kategori::find($id);

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

        }
    }

    public function update(Request $request, $id){
        $kategori = Kategori::find($id);
        $kategori->nama_kategori = $request->nama_kategori;
        $kategori->update();

        if($kategori){
            $kategori = Kategori::find($id);
            return response()->json([
                'success' => true,
                'message' => 'Kategori berhasil diupdate!',
                'data' => $kategori
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

        }
    }
}
