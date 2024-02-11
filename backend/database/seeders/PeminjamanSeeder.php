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
            'admin_id' => 1,
            'mahasiswa_id' => 1,
            'barang_id' => 1,
            'keterangan' => 'barang dengan keadaan baik',
            'status' => 'pending',
            'tanggal_peminjaman' => date('d-m-Y'),
        ]);
    }
}
