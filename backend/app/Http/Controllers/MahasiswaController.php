<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;

class MahasiswaController extends Controller
{
    public function index(){
        $mahasiswa = Mahasiswa::all();

        return response()->json($mahasiswa);
    }

    public function show($id){
        $mahasiswa = Mahasiswa::find($id);

        return response()->json($mahasiswa);
    }

    public function store(Request $request){
        $mahasiswa = new Mahasiswa;
        $mahasiswa->nim = $request->nim;
        $mahasiswa->nama_mahasiswa = $request->nama_mahasiswa;
        $mahasiswa->email = $request->email;
        $mahasiswa->password = bcrypt($request->password);
        $mahasiswa->nohp = $request->nohp;
        $mahasiswa->save();

        if($mahasiswa){
            return response()->json([
                'success' => true,
                'message' => 'Mahasiswa berhasil ditambahkan!',
                'data' => $mahasiswa
            ]);
        }
    }

    public function update(Request $request, $id){
        $mahasiswa = Mahasiswa::find($id);
        $mahasiswa->nim = $request->nim;
        $mahasiswa->nama_mahasiswa = $request->nama_mahasiswa;
        $mahasiswa->email = $request->email;
        $mahasiswa->password = bcrypt($request->password);
        $mahasiswa->nohp = $request->nohp;
        $mahasiswa->update();

        if($mahasiswa){
            return response()->json([
                'success' => true,
                'message' => 'Mahasiswa berhasil diupdate!',
                'data' => $mahasiswa
            ]);
        }
    }

    public function destroy($id){
        $mahasiswa = Mahasiswa::find($id);
        $mahasiswa->delete();

        if($mahasiswa){
            return response()->json([
                'success' => true,
                'message' => 'Mahasiswa berhasil dihapus!',
                'data' => $mahasiswa
            ]);
        }
    }
}
