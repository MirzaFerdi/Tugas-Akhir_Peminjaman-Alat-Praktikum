<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index(){
        $admin = Admin::all();

        return response()->json($admin);
    }

    public function show($id){
        $admin = Admin::find($id);

        return response()->json($admin);
    }

    public function store(Request $request){
        $admin = new Admin;
        $admin->nip = $request->nip;
        $admin->nama_admin = $request->nama_admin;
        $admin->email = $request->email;
        $admin->password = bcrypt($request->password);
        $admin->nohp = $request->nohp;
        $admin->save();

        if($admin){
            return response()->json([
                'success' => true,
                'message' => 'Admin berhasil ditambahkan!',
                'data' => $admin
            ]);
        }
    }

    public function update(Request $request, $id){
        $admin = Admin::find($id);
        $admin->nip = $request->nip;
        $admin->nama_admin = $request->nama_admin;
        $admin->email = $request->email;
        $admin->password = bcrypt($request->password);
        $admin->nohp = $request->nohp;
        $admin->update();

        if($admin){
            return response()->json([
                'success' => true,
                'message' => 'Admin berhasil diupdate!',
                'data' => $admin
            ]);
        }
    }

    public function destroy($id){
        $admin = Admin::find($id);
        $admin->delete();

        if($admin){
            $admin = Admin::find($id);
            return response()->json([
                'success' => true,
                'message' => 'Admin berhasil dihapus!',
            ]);
        }
    }
}
