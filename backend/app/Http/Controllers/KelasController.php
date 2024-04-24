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

    public function naikKelasAll(){
        $userKelas = User::where('kelas_id', 5)->get();
        User::where('role_id', 2)->increment('kelas_id');

        if($userKelas){
            User::where('kelas_id', 5)->update(['role_id' => 3]);
            return response()->json([
                'success' => true,
                'message' => 'Berhasil Naik Kelas!',
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

    // public function naikKelas(Request $request) {
    //     // Memeriksa apakah 'user_ids' ada dalam permintaan
    //     if (!$request->has('id')) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Parameter "id" tidak ditemukan!',
    //         ], 400);
    //     }

    //     $userIds = $request->input('id');

    //     // Memastikan bahwa 'user_ids' adalah array
    //     if (!is_array($userIds)) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Parameter "user_ids" harus berupa array!',
    //         ], 400);
    //     }

    //     foreach ($userIds as $userId) {
    //         $userKelas = User::find($userId);

    //         if(!$userKelas) {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => "User dengan ID $userId tidak ditemukan!",
    //             ], 404);
    //         }

    //         // Menaikkan kelas_id
    //         $userKelas->kelas_id += 1;

    //         // Menyimpan perubahan
    //         $userKelas->save();
    //     }

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Berhasil Naik Kelas untuk semua user!',
    //     ]);
    // }

}
