<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KondisiBarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('kondisi_barang')->insert([
            'user_id' => 3,
            'barang_id' => 2,
            'pengembalian_id' => 1,
            'kondisi_barang' => 'Baik',
        ]);
    }
}
