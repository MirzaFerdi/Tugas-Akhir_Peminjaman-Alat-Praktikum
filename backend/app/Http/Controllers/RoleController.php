<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index(){
        $role = Role::all();

        return response()->json($role);
    }

    public function show($id){
        $role = Role::find($id);

        return response()->json($role);
    }

    public function store(Request $request){
        $role = new Role;
        $role->name = $request->name;
        $role->save();

        if($role){
            return response()->json([
                'success' => true,
                'message' => 'Role berhasil ditambahkan!',
                'data' => $role
            ]);
        }
    }

    public function update(Request $request, $id){
        $role = Role::find($id);
        $role->name = $request->name;
        $role->update();

        if($role){
            return response()->json([
                'success' => true,
                'message' => 'Role berhasil diupdate!',
                'data' => $role
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
        }
    }
}
