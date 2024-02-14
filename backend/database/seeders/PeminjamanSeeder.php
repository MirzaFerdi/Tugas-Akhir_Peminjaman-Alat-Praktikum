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
            'keterangan' => 'Peminjaman barang untuk keperluan tugas akhir',
            'status' => 'Pending',
            'tanggal_peminjaman' => '2021-08-01',
        ]);
        DB::table('peminjaman')->insert([
            'user_id' => 3,
            'barang_id' => 2,
            'keterangan' => 'Peminjaman barang untuk keperluan praktikum',
            'status' => 'Pending',
            'tanggal_peminjaman' => '2021-08-05',
        ]);
    }
}
