<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Peminjaman;
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

        $barang = Barang::find($request->barang_id);
        $barang->jumlah_barang = $barang->jumlah_barang - 1;
        $barang->update();

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
        $peminjaman->update();

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
        $barang->jumlah_barang = $barang->jumlah_barang + 1;
        $barang->update();

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
        $peminjaman->status = 'Diterima';
        $peminjaman->update();

        if($peminjaman){
            return response()->json([
                'success' => true,
                'message' => 'Peminjaman berhasil diapprove!',
                'data' => $peminjaman
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Peminjaman gagal diapprove!',
            ]);
        }
    }

    public function reject($id){
        $peminjaman = Peminjaman::find($id);
        $peminjaman->status = 'Ditolak';
        $peminjaman->update();

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


}
