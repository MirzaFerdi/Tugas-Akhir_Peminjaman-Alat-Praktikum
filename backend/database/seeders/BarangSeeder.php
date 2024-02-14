<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('barang')->insert([
            'kategori_id' => 1,
            'nama_barang' => 'Gerinda',
            'jumlah_barang' => 10,
        ]);
        DB::table('barang')->insert([
            'kategori_id' => 1,
            'nama_barang' => 'Avo Analog',
            'jumlah_barang' => 3,
        ]);
    }


}
