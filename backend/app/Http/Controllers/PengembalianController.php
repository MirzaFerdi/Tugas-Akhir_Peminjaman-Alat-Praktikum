<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Pengembalian;
use Illuminate\Http\Request;

class PengembalianController extends Controller
{
    public function index(){
        $pengembalian = Pengembalian::with('user','barang')->get();

        if(!$pengembalian){
            return response()->json([
                'success' => false,
                'message' => 'Data pengembalian tidak ditemukan!',
            ]);
        }

        return response()->json($pengembalian);
    }

    public function show($id){
        $pengembalian = Pengembalian::with('user','barang')->find($id);

        if(!$pengembalian){
            return response()->json([
                'success' => false,
                'message' => 'Data pengembalian tidak ditemukan',
            ]);
        }

        return response()->json($pengembalian);
    }

    public function store(Request $request){
        $pengembalian = new Pengembalian;
        $pengembalian->user_id = $request->user_id;
        $pengembalian->barang_id = $request->barang_id;
        $pengembalian->keterangan = $request->keterangan;
        $pengembalian->status = $request->status;
        $pengembalian->tanggal_pengembalian = $request->tanggal_pengembalian;
        $pengembalian->save();

        if($pengembalian){
            return response()->json([
                'success' => true,
                'message' => 'Pengembalian berhasil ditambahkan!',
                'data' => $pengembalian
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian gagal ditambahkan!',
            ]);
        }
    }

    public function update(Request $request, $id){
        $pengembalian = Pengembalian::find($id);
        $pengembalian->user_id = $request->user_id;
        $pengembalian->barang_id = $request->barang_id;
        $pengembalian->keterangan = $request->keterangan;
        $pengembalian->status = $request->status;
        $pengembalian->tanggal_pengembalian = $request->tanggal_pengembalian;
        $pengembalian->save();

        if($pengembalian){
            return response()->json([
                'success' => true,
                'message' => 'Pengembalian berhasil diupdate!',
                'data' => $pengembalian
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian gagal diupdate!',
            ]);
        }
    }

    public function destroy($id){
        $pengembalian = Pengembalian::find($id);
        $pengembalian->delete();

        if($pengembalian){
            $pengembalian = Pengembalian::find($id);
            return response()->json([
                'success' => true,
                'message' => 'Pengembalian berhasil dihapus!',
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian gagal dihapus!',
            ]);
        }
    }

    public function approve($id){
        $pengembalian = Pengembalian::find($id);

        if(!$pengembalian){
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian tidak ditemukan!',
            ]);
        }

        if($pengembalian->status === 'Diterima'){
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian sudah diterima!',
            ]);
        }

        $pengembalian->status = 'Diterima';
        $pengembalian->save();

        $barang = Barang::find($pengembalian->barang_id);
        $barang->stok_tersedia = $barang->stok_tersedia + 1;
        $barang->save();

        return response()->json([
            'success' => true,
            'message' => 'Pengembalian berhasil diterima!',
            'data' => $pengembalian
        ]);
    }

    public function reject($id){
        $pengembalian = Pengembalian::find($id);
        $pengembalian->status = 'Ditolak';
        $pengembalian->save();

        if($pengembalian){
            return response()->json([
                'success' => true,
                'message' => 'Pengembalian berhasil ditolak!',
                'data' => $pengembalian
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian gagal ditolak!',
            ]);
        }
    }


    public function sortTimestamps($keywords){
        // Retrieve timestamps from the database
        $pengembalian = Pengembalian::with('user','barang')->get();

        // Sort timestamps based on the specified order
        if ($keywords === 'asc') {
            $pengembalian = $pengembalian->sort();
        } elseif ($keywords === 'desc') {
            $pengembalian = $pengembalian->sortDesc();
        } else {
            return response()->json(['message' => 'Parameter salah. Gunakan "asc" atau "desc"'], 400);
        }

        // Return sorted timestamps as JSON response
        return response()->json($pengembalian);
    }

    public function getPengembalianByUserId($id){
        $pengembalian = Pengembalian::with('user','barang')->where('user_id',$id)->get();

        if($pengembalian){
            return response()->json([
                'success' => true,
                'message' => 'Data pengembalian ditemukan!',
                'data' => $pengembalian
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Data pengembalian tidak ditemukan!',
            ]);
        }

        return response()->json($pengembalian);
    }
}
