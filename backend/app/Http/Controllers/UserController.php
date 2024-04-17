<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index(){
        $user = User::with('kelas','role')->get();

        if(!$user){
            return response()->json([
                'success' => false,
                'message' => 'Data user tidak ditemukan!',
            ]);
        }

        return response()->json($user);
    }

    public function show($id){
        $user = User::find($id);

        if(!$user){
            return response()->json([
                'success' => false,
                'message' => 'Data user tidak ditemukan!',
            ]);
        }

        return response()->json($user);
    }

    public function showByKelas($id){
        $user = User::where('kelas_id', $id)->with('kelas')->get();

        if(!$user){
            return response()->json([
                'success' => false,
                'message' => 'Data user dengan kelas tersebut tidak ditemukan!',
            ]);
        }

        return response()->json($user);
    }

    public function searchMahasiswa($kelasid,$keywords){
        $user = User::where('role_id', 2)->where('kelas_id',$kelasid)->where('nama', 'like', "%$keywords%")->get();

        if($user->isEmpty()){
            return response()->json([
                'success' => false,
                'message' => 'Mahasiswa tidak ditemukan!',
            ]);
        }

        return response()->json($user);
    }

    public function mahasiswaByKelasId($kelasid, $id) {
        $user = User::where('role_id', 2)->where('kelas_id', $kelasid)->where('id', $id)->get();

        if ($user->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Mahasiswa tidak ditemukan!',
            ]);
        }

        return response()->json($user);
    }

    public function store(Request $request){
        $user = new User;
        $user->nama = $request->nama;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->nohp = $request->nohp;
        $user->kelas_id = $request->kelas_id;
        $user->role_id = $request->role_id;
        $user->save();

        if($user){
            return response()->json([
                'success' => true,
                'message' => 'User berhasil ditambahkan!',
                'data' => $user
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'User gagal ditambahkan!',
            ]);
        }
    }

    public function update(Request $request, $id){
        $user = User::find($id);
        $user->nama = $request->nama;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->nohp = $request->nohp;
        $user->kelas_id = $request->kelas_id;
        $user->role_id = $request->role_id;
        $user->update();

        if($user){
            return response()->json([
                'success' => true,
                'message' => 'User berhasil diupdate!',
                'data' => $user
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'User gagal diupdate!',
            ]);
        }
    }

    public function naikKelas($kelasid){

        if($kelasid == 4){
            // $user->update(['role_id' => 3, 'kelas_id' => $kelasid+1]);
            $user = User::where('kelas_id', $kelasid)->update(['role_id' => 3, 'kelas_id' => $kelasid+1]);
            return response()->json([
                'success' => true,
                'message' => 'User berhasil menjadi alumni!!!',
                'data' => $user
            ]);
        }elseif($kelasid == 5){

            return response()->json([
                'success' => false,
                'message' => 'User sudah menjadi alumni!!!',
            ],400);
        }else{
            $user = User::where('kelas_id', $kelasid)->update(['kelas_id' => $kelasid+1]);
            return response()->json([
                'success' => true,
                'message' => 'User berhasil naik Kelas!!!',
                'data' => $user
            ]);
        }

    }

    public function destroy($id){
        $user = User::find($id);
        $user->delete();

        if($user){
            $user = User::find($id);
            return response()->json([
                'success' => true,
                'message' => 'User berhasil dihapus!',
                'data' => $user
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'User gagal dihapus!',
            ]);
        }
    }
}
