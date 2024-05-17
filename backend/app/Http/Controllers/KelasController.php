<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\User;
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
        $cekKelas = Kelas::where('kelas', $request->kelas)->exists();

        if($cekKelas){
            return response()->json([
                'success' => false,
                'message' => 'Kelas sudah ada!',
            ]);
        }


        $kelas = new Kelas;
        $kelas->kelas = $request->kelas;
        $kelas->dpa = $request->dpa;
        $kelas->tahun_ajaran = $request->tahun_ajaran;
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

        if(!$kelas){
            return response()->json([
                'success' => false,
                'message' => 'kelas tidak ditemukan!',
            ]);
        }

        if($request->kelas == $kelas->kelas){
            $kelas->dpa = $request->dpa;
            $kelas->tahun_ajaran = $request->tahun_ajaran;
            $kelas->save();

            return response()->json([
                'success' => true,
                'message' => 'Kelas berhasil diupdate!',
                'data' => $kelas
            ]);
        }else{
            $cekKelas = Kelas::where('kelas', $request->kelas)->where('id', '!=', $id)->exists();

            if($cekKelas){
                return response()->json([
                    'success' => false,
                    'message' => 'Kelas sudah ada!',
                ]);
            }else{
                $kelas->kelas = $request->kelas;
                $kelas->dpa = $request->dpa;
                $kelas->tahun_ajaran = $request->tahun_ajaran;
                $kelas->save();

                return response()->json([
                    'success' => true,
                    'message' => 'Kelas berhasil diupdate!',
                    'data' => $kelas
                ]);
            }
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

    public function naikKelas(Request $request) {
        $userIds = $request->input('id');


        foreach ($userIds as $userId) {
            $userKelas = User::find($userId);

            if(!$userKelas) {
                return response()->json([
                    'success' => false,
                    'message' => "User dengan ID $userId tidak ditemukan!",
                ], 404);
            }

            $userKelas->kelas_id += 1;
            $userKelas->save();

        }
        User::where('kelas_id', 5)->update(['role_id' => 3]);

        return response()->json([
            'success' => true,
            'message' => 'Berhasil Naik Kelas untuk semua user!',
        ]);
    }

}
