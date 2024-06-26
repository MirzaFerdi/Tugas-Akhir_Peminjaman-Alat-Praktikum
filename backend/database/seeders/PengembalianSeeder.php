<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PengembalianSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('pengembalian')->insert([
            'user_id' => 2,
            'barang_id' => 1,
            'peminjaman_id' => null,
            'keterangan' => 'keadaan baik',
            'status' => 'Pending',
            'jumlah_pengembalian' => 1,
            'tanggal_pengembalian' => '2023-10-15 12:00:45',
        ]);
        DB::table('pengembalian')->insert([
            'user_id' => 3,
            'barang_id' => 2,
            'peminjaman_id' => null,
            'keterangan' => 'rusak',
            'status' => 'Pending',
            'jumlah_pengembalian' => 1,
            'tanggal_pengembalian' => '2024-05-11 05:10:23',
        ]);
    }
}
