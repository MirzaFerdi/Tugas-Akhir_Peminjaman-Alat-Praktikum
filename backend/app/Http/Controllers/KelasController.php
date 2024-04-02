<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use Illuminate\Http\Request;

class KelasController extends Controller
{
    public function index(){
        $kelas = Kelas::all();

        if(!$kelas){
            return response()->json([
                'success' => false,
                'message' => 'Data kelas tidak ditemukan!',
            ]);
        }

        return response()->json($kelas);
    }

    public function show($id){
        $kelas = Kelas::find($id);

        if(!$kelas){
            return response()->json([
                'success' => false,
                'message' => 'Data kelas tidak ditemukan!',
            ]);
        }

        return response()->json($kelas);
    }

    public function store(Request $request){
        $kelas = new Kelas;
        $kelas->kelas = $request->kelas;
        $kelas->dpa = $request->dpa;
        $kelas->tahun_ajaran = $request->tahun_ajaran;
        $kelas->user_id = $request->user_id;
        $kelas->save();

        if($kelas){
            return response()->json([
                'success' => true,
                'message' => 'Kelas berhasil ditambahkan!',
                'data' => $kelas
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Kelas gagal ditambahkan!',
            ]);
        }
    }

    public function update(Request $request, $id){
        $kelas = Kelas::find($id);
        $kelas->kelas = $request->kelas;
        $kelas->dpa = $request->dpa;
        $kelas->tahun_ajaran = $request->tahun_ajaran;
        $kelas->user_id = $request->user_id;
        $kelas->update();

        if($kelas){
            return response()->json([
                'success' => true,
                'message' => 'Kelas berhasil diupdate!',
                'data' => $kelas
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Kelas gagal diupdate!',
            ]);
        }
    }

    public function destroy($id){
        $kelas = Kelas::find($id);
        $kelas->delete();

        if($kelas){
            $kelas = Kelas::find($id);
            return response()->json([
                'success' => true,
                'message' => 'Kelas berhasil dihapus!',
                'data' => $kelas
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Kelas gagal dihapus!',
            ]);
        }
    }
}
