<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Barang;
use App\Models\Peminjaman;
use App\Models\Pengembalian;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index()
    {
        $user = User::with('kelas', 'role')->get();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Data user tidak ditemukan!',
            ]);
        }

        return response()->json($user);
    }

    public function show($id)
    {
        $user = User::with('kelas', 'role')->find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Data user tidak ditemukan!',
            ]);
        }

        return response()->json($user);
    }

    public function showByKelas($kelasId)
    {
        $user = User::where('kelas_id', $kelasId)->with('kelas')->paginate(8);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Data user dengan kelas tersebut tidak ditemukan!',
            ]);
        }

        return response()->json($user);
    }

    public function searchMahasiswaKelas($idKelas, $keywords)
    {
        $user = User::where('role_id', 2)->where('kelas_id', $idKelas)->where(function ($query) use ($keywords) {
            $query->where('nama', 'like', '%' . $keywords . '%')
                ->orWhere('username', 'like', '%' . $keywords . '%')
                ->orWhere('email', 'like', '%' . $keywords . '%');
        })->get();

        if ($user->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Mahasiswa tidak ditemukan!',
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $user
        ]);
    }

    public function mahasiswaAll()
    {
        $user = User::where('role_id', 2)->paginate(8);

        if ($user->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Mahasiswa tidak ditemukan!',
            ]);
        }

        return response()->json($user);
    }

    public function searchMahasiswaAll($keywords)
    {
        $user = User::where('role_id', 2)->where(function ($query) use ($keywords) {
            $query->where('nama', 'like', '%' . $keywords . '%')
                ->orWhere('username', 'like', '%' . $keywords . '%')
                ->orWhereHas('kelas', function ($query) use ($keywords) {
                    $query->where('kelas', 'like', '%' . $keywords . '%');
                });
        })->with('kelas')->get();

        if ($user->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Mahasiswa tidak ditemukan!',
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $user
        ]);
    }

    public function mahasiswaByKelasId($kelasId, $id)
    {
        $user = User::where('role_id', 2)->where('kelas_id', $kelasId)->where('id', $id)->get();

        if ($user->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Mahasiswa tidak ditemukan!',
            ]);
        }

        return response()->json($user);
    }


    public function countAll()
    {
        $user = User::where('role_id', 2)->count();
        $barang = Barang::count();
        $peminjaman = Peminjaman::count();
        $pengembalian = Pengembalian::count();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Data user tidak ditemukan!',
            ]);
        }

        return response()->json([
            'User: ' => $user,
            'Barang: ' => $barang,
            'Peminjaman: ' => $peminjaman,
            'Pengembalian: ' => $pengembalian

        ]);
    }

    public function store(Request $request)
    {

        if (User::where('username', $request->username)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Username sudah terdaftar!',
            ]);
        }

        if (User::where('email', $request->email)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Email sudah terdaftar!',
            ]);
        }

        $user = new User;
        $user->nama = $request->nama;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->nohp = $request->nohp;
        $user->kelas_id = $request->kelas_id;
        $user->role_id = $request->role_id;


        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('public/foto', $filename);
            $user->foto = $filename;
        }

        $user->save();



        if ($user) {
            return response()->json([
                'success' => true,
                'message' => 'User berhasil ditambahkan!',
                'data' => $user
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'User gagal ditambahkan!',
            ]);
        }
    }

    public function update(Request $request, $id)
    {


        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Pengguna tidak ditemukan!',
            ]);
        }

        if ($user->username !== $request->username && User::where('username', $request->username)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Username sudah terdaftar!',
            ]);
        }

        if ($user->email !== $request->email && User::where('email', $request->email)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Email sudah terdaftar!',
            ]);
        }

        $user->nama = $request->nama;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->nohp = $request->nohp;
        $user->kelas_id = $request->kelas_id;
        $user->role_id = $request->role_id;

        if ($request->hasFile('foto')) {
            if ($user->foto && Storage::exists('public/foto/' . $user->foto)) {
                Storage::delete('public/foto/' . $user->foto);
            }
            $file = $request->file('foto');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('public/foto', $filename);
            $user->foto = $filename;
        }

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'User berhasil diupdate!',
            'data' => $user
        ]);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();

        if ($user) {
            $user = User::find($id);
            return response()->json([
                'success' => true,
                'message' => 'User berhasil dihapus!',
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'User gagal dihapus!',
            ]);
        }
    }
}
