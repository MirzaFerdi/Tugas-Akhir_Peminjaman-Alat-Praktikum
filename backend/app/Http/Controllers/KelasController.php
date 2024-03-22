<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use Illuminate\Http\Request;

class KelasController extends Controller
{
    public function index(){
        $kelas = Kelas::all();

        return response()->json($kelas);
    }

    public function show($id){
        $kelas = Kelas::find($id);

        return response()->json($kelas);
    }

    public function store(Request $request){
        $kelas = new Kelas;
        $kelas->kelas = $request->kelas;
        $kelas->dosen_pembimbing_akademik = $request->dosen_pembimbing_akademik;
        $kelas->tahun_ajaran = $request->tahun_ajaran;
        $kelas->user_id = $request->user_id;
        $kelas->save();

        if($kelas){
            return response()->json([
                'success' => true,
                'message' => 'Kelas berhasil ditambahkan!',
                'data' => $kelas
            ]);
        }
    }

    public function update(Request $request, $id){
        $kelas = Kelas::find($id);
        $kelas->kelas = $request->kelas;
        $kelas->dosen_pembimbing_akademik = $request->dosen_pembimbing_akademik;
        $kelas->tahun_ajaran = $request->tahun_ajaran;
        $kelas->user_id = $request->user_id;
        $kelas->update();

        if($kelas){
            return response()->json([
                'success' => true,
                'message' => 'Kelas berhasil diupdate!',
                'data' => $kelas
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
        }
    }
}
