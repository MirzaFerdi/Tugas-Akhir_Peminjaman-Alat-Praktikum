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
            'keterangan' => 'keadaan baik',
            'status' => 'Pending',
            'tanggal_pengembalian' => '2021-08-03',
        ]);
        DB::table('pengembalian')->insert([
            'user_id' => 3,
            'barang_id' => 2,
            'keterangan' => 'rusak',
            'status' => 'Pending',
            'tanggal_pengembalian' => '2021-08-06',
        ]);
    }
}
