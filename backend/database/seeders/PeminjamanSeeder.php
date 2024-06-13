<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PeminjamanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('peminjaman')->insert([
            'user_id' => 2,
            'barang_id' => 1,
            'pengembalian_id' => null,
            'keterangan' => 'Peminjaman barang untuk keperluan tugas akhir',
            'status' => 'Pending',
            'jumlah_peminjaman' => 1,
            'tanggal_peminjaman' => '2024-05-22',
            'tenggat_peminjaman' => null,
        ]);
        DB::table('peminjaman')->insert([
            'user_id' => 2,
            'barang_id' => 1,
            'pengembalian_id' => null,
            'keterangan' => 'Peminjaman barang untuk keperluan tugas akhir',
            'status' => 'Pending',
            'jumlah_peminjaman' => 1,
            'tanggal_peminjaman' => '2023-02-12',
            'tenggat_peminjaman' => null,
        ]);
        DB::table('peminjaman')->insert([
            'user_id' => 3,
            'barang_id' => 4,
            'pengembalian_id' => null,
            'keterangan' => 'Peminjaman barang untuk keperluan tugas akhir',
            'status' => 'Pending',
            'jumlah_peminjaman' => 1,
            'tanggal_peminjaman' => '2023-12-10',
            'tenggat_peminjaman' => null,
        ]);
        DB::table('peminjaman')->insert([
            'user_id' => 5,
            'barang_id' => 2,
            'pengembalian_id' => null,
            'keterangan' => 'Peminjaman barang untuk keperluan tugas akhir',
            'status' => 'Pending',
            'jumlah_peminjaman' => 1,
            'tanggal_peminjaman' => '2024-02-12',
            'tenggat_peminjaman' => null,
        ]);
    }
}
