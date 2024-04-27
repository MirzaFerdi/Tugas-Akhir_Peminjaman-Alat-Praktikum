<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Peminjaman;
use App\Models\Pengembalian;
use Illuminate\Http\Request;

class PeminjamanController extends Controller
{
    public function index(){
        // $peminjaman = Peminjaman::all();
        $peminjaman = Peminjaman::with('user','barang')->get();;

        if(!$peminjaman){
            return response()->json([
                'success' => false,
                'message' => 'Data peminjaman tidak ditemukan!',
            ]);
        }

        return response()->json($peminjaman);
    }

    public function show($id){
        $peminjaman = Peminjaman::with('user','barang')->find($id);

        if(!$peminjaman){
            return response()->json([
                'success' => false,
                'message' => 'Data peminjaman tidak ditemukan',
            ]);
        }

        return response()->json($peminjaman);
    }

    public function store(Request $request){
        $peminjaman = new Peminjaman;
        $peminjaman->user_id = $request->user_id;
        $peminjaman->barang_id = $request->barang_id;
        $peminjaman->keterangan = $request->keterangan;
        $peminjaman->status = $request->status;
        $peminjaman->tanggal_peminjaman = $request->tanggal_peminjaman;
        $peminjaman->save();


        if($peminjaman){
            return response()->json([
                'success' => true,
                'message' => 'Peminjaman berhasil ditambahkan!',
                'data' => $peminjaman
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Peminjaman gagal ditambahkan!',
            ]);
        }
    }

    public function update(Request $request, $id){
        $peminjaman = Peminjaman::find($id);
        $peminjaman->user_id = $request->user_id;
        $peminjaman->barang_id = $request->barang_id;
        $peminjaman->keterangan = $request->keterangan;
        $peminjaman->status = $request->status;
        $peminjaman->tanggal_peminjaman = $request->tanggal_peminjaman;
        $peminjaman->save();

        if($peminjaman){
            return response()->json([
                'success' => true,
                'message' => 'Peminjaman berhasil diupdate!',
                'data' => $peminjaman
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Peminjaman gagal diupdate!',
            ]);
        }
    }

    public function destroy($id){
        $peminjaman = Peminjaman::find($id);
        $peminjaman->delete();

        $barang = Barang::find($peminjaman->barang_id);
        $barang->stok_tersedia = $barang->stok_tersedia + 1;
        $barang->save();

        if($peminjaman){
            $peminjaman = Peminjaman::find($id);
            return response()->json([
                'success' => true,
                'message' => 'Peminjaman berhasil dihapus!',
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Peminjaman gagal dihapus!',
            ]);
        }
    }

    public function approve($id){
        $peminjaman = Peminjaman::find($id);

        if(!$peminjaman){
            return response()->json([
                'success' => false,
                'message' => 'Peminjaman tidak ditemukan!',
            ]);
        }

        if($peminjaman->status === 'Diterima'){
            return response()->json([
                'success' => false,
                'message' => 'Peminjaman sudah diterima!',
            ]);
        }

        $peminjaman->status = 'Diterima';
        $peminjaman->save();

        $barang = Barang::find($peminjaman->barang_id);
        $barang->stok_tersedia = $barang->stok_tersedia - 1;
        $barang->save();

        return response()->json([
            'success' => true,
            'message' => 'Peminjaman berhasil diterima!',
            'data' => $peminjaman
        ]);
    }

    public function reject($id){
        $peminjaman = Peminjaman::find($id);
        $peminjaman->status = 'Ditolak';
        $peminjaman->save();

        if($peminjaman){
            return response()->json([
                'success' => true,
                'message' => 'Peminjaman berhasil ditolak!',
                'data' => $peminjaman
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Peminjaman gagal ditolak!',
            ]);
        }
    }

    public function sortTimestamps($keywords){
        // Retrieve timestamps from the database
        $peminjaman = Peminjaman::with('user','barang')->get();;

        // Sort timestamps based on the specified order
        if ($keywords === 'asc') {
            $peminjaman = $peminjaman->sort();
        } elseif ($keywords === 'desc') {
            $peminjaman = $peminjaman->sortDesc();
        } else {
            return response()->json(['message' => 'Parameter salah. Gunakan "asc" atau "desc"'], 400);
        }

        // Return sorted timestamps as JSON response
        return response()->json($peminjaman);
    }

    public function getPeminjamanByUserId($id){
        $peminjaman = Peminjaman::with('user','barang')->where('user_id', $id)->get();

        if($peminjaman){
            return response()->json([
                'success' => true,
                'message' => 'Data peminjaman ditemukan!',
                'data' => $peminjaman
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Data peminjaman tidak ditemukan!',
            ]);
        }

        return response()->json($peminjaman);
    }

    public function getPeminjamanApproved($id){
        $peminjaman = Peminjaman::with('user','barang')->where('status', 'Diterima')->where('user_id', $id)->get();

        if($peminjaman->isEmpty()){
            return response()->json([
                'success' => false,
                'message' => 'Data peminjaman tidak ditemukan!',
            ]);
        }else{
            return response()->json([
                'success' => true,
                'message' => 'Data peminjaman ditemukan!',
                'data' => $peminjaman
            ]);
        }
    }

    public function rekapPeminjaman(){
        $peminjaman = Peminjaman::with('user','barang')->get();
        $pengembalian = Pengembalian::with('user','barang')->get();

        if($peminjaman->isEmpty()){
            return response()->json([
                'success' => false,
                'message' => 'Data peminjaman tidak ditemukan!',
            ]);
        }else{
            return response()->json([
                'success' => true,
                'message' => 'Data peminjaman ditemukan!',
                'peminjaman' => $peminjaman,
                'pengembalian' => $pengembalian
            ]);
        }
    }
}
