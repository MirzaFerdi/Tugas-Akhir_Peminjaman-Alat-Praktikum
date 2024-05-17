<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BroadcastSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('broadcast')->insert([
            'judul' => 'Pengumuman Untuk Seluruh Mahasiswa TRO',
            'pesan' => 'Hari Selasa, 7 Mei 2024. Lakukan request peminjaman alat di Gudang Peralatan Lab. Tidak perlu menunggu persetujuan, baik untuk peminjaman maupun pengembalian. Setelah selesai test SOP, saya akan cek request. Terima kasih! ',
        ]);
        DB::table('broadcast')->insert([
            'judul' => 'Pengumuman Untuk Seluruh Mahasiswa TRO',
            'pesan' => 'Hari Rabu, 15 Mei 2024, Untuk peminjaman alat, lakukan request dan ambil di Gudang Peralatan Lab. Tidak perlu menunggu persetujuan dari saya, baik untuk peminjaman maupun pengembalian. Setelah selesai test SOP, saya akan cek request. Terima kasih!',
        ]);
        DB::table('broadcast')->insert([
            'judul' => 'Pengumuman Untuk Seluruh Mahasiswa TRO',
            'pesan' => 'Hari Rabu, 15 Mei 2024, Untuk peminjaman alat, lakukan request dan ambil di Gudang Peralatan Lab. Tidak perlu menunggu persetujuan dari saya, baik untuk peminjaman maupun pengembalian. Setelah selesai test SOP, saya akan cek request. Terima kasih!',
        ]);
        DB::table('broadcast')->insert([
            'judul' => 'Pengumuman Untuk Seluruh Mahasiswa TRO',
            'pesan' => 'Hari Rabu, 15 Mei 2024, Untuk peminjaman alat, lakukan request dan ambil di Gudang Peralatan Lab. Tidak perlu menunggu persetujuan dari saya, baik untuk peminjaman maupun pengembalian. Setelah selesai test SOP, saya akan cek request. Terima kasih!',
        ]);
        DB::table('broadcast')->insert([
            'judul' => 'Pengumuman Untuk Seluruh Mahasiswa TRO',
            'pesan' => 'Hari Rabu, 15 Mei 2024, Untuk peminjaman alat, lakukan request dan ambil di Gudang Peralatan Lab. Tidak perlu menunggu persetujuan dari saya, baik untuk peminjaman maupun pengembalian. Setelah selesai test SOP, saya akan cek request. Terima kasih!',
        ]);
    }
}
