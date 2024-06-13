<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use Illuminate\Http\Request;

class BarangController extends Controller
{
    public function index()
    {
        $barang = Barang::all();

        if (!$barang) {
            return response()->json([
                'success' => false,
                'message' => 'Data barang tidak ditemukan!',
            ]);
        }

        return response()->json($barang);
    }

    public function show($id)
    {
        $barang = Barang::find($id);

        if (!$barang) {
            return response()->json([
                'success' => false,
                'message' => 'Data barang tidak ditemukan!',
            ]);
        }

        return response()->json($barang);
    }

    public function showByKategori($kategoriId)
    {
        $barang = Barang::where('kategori_id', $kategoriId)->get();

        if (!$barang) {
            return response()->json([
                'success' => false,
                'message' => 'Kategori tidak ditemukan!',
            ]);
        }
        return response()->json([
            'success' => true,
            'data' => $barang
        ]);
    }

    public function search($kategoriId, $keywords)
    {
        $barang = Barang::where('kategori_id', $kategoriId)->where(function ($query) use ($keywords) {
            $query->where('nama_barang', 'like', "%$keywords%")
                ->orWhere('kode_barang', 'like', "%$keywords%");
        })->get();

        if (!$barang) {
            return response()->json([
                'success' => false,
                'message' => 'Barang tidak ditemukan!',
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $barang
        ]);
    }

    public function paginationBarang($kategoriId, $limit)
    {
        $barang = Barang::where('kategori_id', $kategoriId)->paginate($limit);

        return response()->json($barang);
    }

    public function store(Request $request)
    {
        $cekBarang = Barang::where('kode_barang', $request->kode_barang)->exists();

        if ($cekBarang) {
            return response()->json([
                'success' => false,
                'message' => 'Kode barang sudah ada!',
            ]);
        }

        $barang = new Barang;
        $barang->kategori_id = $request->kategori_id;
        $barang->kode_barang = $request->kode_barang;
        $barang->nama_barang = $request->nama_barang;
        $barang->stok_awal = $request->stok_awal;
        $barang->stok_tersedia = $request->stok_tersedia;
        $barang->save();

        if ($barang) {
            return response()->json([
                'success' => true,
                'message' => 'Barang berhasil ditambahkan!',
                'data' => $barang
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Barang gagal ditambahkan!',
            ]);
        }
    }

    public function update(Request $request, $id)
    {

        $barang = Barang::find($id);

        if (!$barang) {
            return response()->json([
                'success' => false,
                'message' => 'Data barang tidak ditemukan!',
            ]);
        }
        //Lgsung menyimpan jika kode barang sama dengan sebelumnya
        if ($request->kode_barang == $barang->kode_barang) {
            $barang->kategori_id = $request->kategori_id;
            $barang->nama_barang = $request->nama_barang;
            $barang->stok_awal = $request->stok_awal;
            $barang->stok_tersedia = $request->stok_tersedia;
            $barang->save();

            return response()->json([
                'success' => true,
                'message' => 'Barang berhasil diupdate!',
                'data' => $barang
            ]);
        } else {
            //cek kode barang terlebih dahulu, jika kode barang berbeda dengan sebelumnya dan kode barang sudah terdaftar
            $cekBarang = Barang::where('kode_barang', $request->kode_barang)->where('id', '!=', $id)->exists();

            if ($cekBarang) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kode barang sudah ada!',
                ]);
            } else {
                $barang->kategori_id = $request->kategori_id;
                $barang->kode_barang = $request->kode_barang;
                $barang->nama_barang = $request->nama_barang;
                $barang->stok_awal = $request->stok_awal;
                $barang->stok_tersedia = $request->stok_tersedia;
                $barang->save();

                return response()->json([
                    'success' => true,
                    'message' => 'Barang berhasil diupdate!',
                    'data' => $barang
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $barang = Barang::find($id);


        if ($barang) {
            $barang->delete();
            return response()->json([
                'success' => true,
                'message' => 'Barang berhasil dihapus!',
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Barang gagal dihapus!',
            ]);
        }
    }
}
