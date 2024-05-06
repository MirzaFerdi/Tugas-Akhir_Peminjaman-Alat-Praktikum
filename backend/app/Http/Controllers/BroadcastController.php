<?php

namespace App\Http\Controllers;

use App\Models\Broadcast;
use Illuminate\Http\Request;

class BroadcastController extends Controller
{
    public function index()
    {
        $broadcast = Broadcast::all();

        if (!$broadcast) {
            return response()->json([
                'success' => false,
                'message' => 'Data broadcast tidak ditemukan!',
            ]);
        }

        return response()->json($broadcast);
    }
    public function show($id)
    {
        $broadcast = Broadcast::find($id);

        if (!$broadcast) {
            return response()->json([
                'success' => false,
                'message' => 'Data broadcast tidak ditemukan!',
            ]);
        }

        return response()->json($broadcast);
    }

    public function store(Request $request)
    {
        $broadcast = new Broadcast;
        $broadcast->pesan = $request->pesan;
        $broadcast->save();

        if ($broadcast) {
            return response()->json([
                'success' => true,
                'message' => 'Broadcast berhasil ditambahkan!',
                'data' => $broadcast
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Broadcast gagal ditambahkan!',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $broadcast = Broadcast::find($id);
        $broadcast->pesan = $request->pesan;
        $broadcast->save();

        if ($broadcast) {
            return response()->json([
                'success' => true,
                'message' => 'Broadcast berhasil diupdate!',
                'data' => $broadcast
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Broadcast gagal diupdate!',
            ]);
        }
    }

    public function destroy($id)
    {
        $broadcast = Broadcast::find($id);
        $broadcast->delete();

        if ($broadcast) {
            $broadcast = Broadcast::find($id);
            return response()->json([
                'success' => true,
                'message' => 'Broadcast berhasil dihapus!',
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Broadcast gagal dihapus!',
            ]);
        }
    }
}
