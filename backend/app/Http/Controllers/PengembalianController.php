<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Pengembalian;
use Illuminate\Http\Request;

class PengembalianController extends Controller
{
    public function index(){
        $pengembalian = Pengembalian::with('user','barang')->get();

        return response()->json($pengembalian);
    }

    public function show($id){
        $pengembalian = Pengembalian::find($id)->with('user','barang')->get();

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

        $barang = Barang::find($request->barang_id);
        $barang->jumlah_barang = $barang->jumlah_barang + 1;
        $barang->update();

        if($pengembalian){
            return response()->json([
                'success' => true,
                'message' => 'Pengembalian berhasil ditambahkan!',
                'data' => $pengembalian
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
        $pengembalian->update();

        if($pengembalian){
            return response()->json([
                'success' => true,
                'message' => 'Pengembalian berhasil diupdate!',
                'data' => $pengembalian
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
        }
    }

    public function approve($id){
        $pengembalian = Pengembalian::find($id);
        $pengembalian->status = 'Diterima';
        $pengembalian->update();

        if($pengembalian){
            return response()->json([
                'success' => true,
                'message' => 'Pengembalian berhasil diterima!',
                'data' => $pengembalian
            ]);
        }
    }

    public function reject($id){
        $pengembalian = Pengembalian::find($id);
        $pengembalian->status = 'Ditolak';
        $pengembalian->update();

        if($pengembalian){
            return response()->json([
                'success' => true,
                'message' => 'Pengembalian berhasil ditolak!',
                'data' => $pengembalian
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
            return response()->json(['message' => 'Invalid order parameter. Use "asc" or "desc"'], 400);
        }

        // Return sorted timestamps as JSON response
        return response()->json($pengembalian);
    }
}
