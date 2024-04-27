<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;


class RoleController extends Controller
{
    public function index(){
        $role = Role::all();

        if(!$role){
            return response()->json([
                'success' => false,
                'message' => 'Data role tidak ditemukan!',
            ]);
        }

        return response()->json($role);
    }

    public function show($id){
        $role = Role::find($id);

        if(!$role){
            return response()->json([
                'success' => false,
                'message' => 'Data role tidak ditemukan!',
            ]);
        }

        return response()->json($role);
    }

    public function store(Request $request){
        $role = new Role;
        $role->nama = $request->nama;
        $role->save();

        if($role){
            return response()->json([
                'success' => true,
                'message' => 'Role berhasil ditambahkan!',
                'data' => $role
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Role gagal ditambahkan!',
            ]);
        }
    }

    public function update(Request $request, $id){
        $role = Role::find($id);
        $role->nama = $request->nama;
        $role->save();

        if($role){
            return response()->json([
                'success' => true,
                'message' => 'Role berhasil diupdate!',
                'data' => $role
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Role gagal diupdate!',
            ]);
        }
    }

    public function destroy($id){
        $role = Role::find($id);
        $role->delete();

        if($role){
            $role = Role::find($id);
            return response()->json([
                'success' => true,
                'message' => 'Role berhasil dihapus!',
                'data' => $role
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Role gagal dihapus!',
            ]);
        }
    }
}
