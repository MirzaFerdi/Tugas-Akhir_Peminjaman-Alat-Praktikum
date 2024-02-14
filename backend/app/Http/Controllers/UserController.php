<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index(){
        $user = User::all();

        return response()->json($user);
    }

    public function show($id){
        $user = User::find($id);

        return response()->json($user);
    }

    public function store(Request $request){
        $user = new User;
        $user->nama = $request->nama;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->nohp = $request->nohp;
        $user->role_id = $request->role_id;
        $user->save();

        if($user){
            return response()->json([
                'success' => true,
                'message' => 'User berhasil ditambahkan!',
                'data' => $user
            ]);
        }
    }

    public function update(Request $request, $id){
        $user = User::find($id);
        $user->nama = $request->nama;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->nohp = $request->nohp;
        $user->role_id = $request->role_id;
        $user->update();

        if($user){
            return response()->json([
                'success' => true,
                'message' => 'User berhasil diupdate!',
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
        }
    }
}
