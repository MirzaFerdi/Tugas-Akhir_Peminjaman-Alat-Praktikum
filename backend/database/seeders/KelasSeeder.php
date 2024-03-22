<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('kelas')->insert([
            'kelas' => 1,
            'dosen_pembimbing_akademik' => 'Alvionithasari S.Kom, M.Kom',
            'tahun_ajaran' => '2023/2024',
        ]);
        DB::table('kelas')->insert([
            'kelas' => 2,
            'dosen_pembimbing_akademik' => 'Very Sugiarto, S.Kom, M.Kom',
            'tahun_ajaran' => '2022/2023',
        ]);
        DB::table('kelas')->insert([
            'kelas' => 3,
            'dosen_pembimbing_akademik' => 'Gunawan Budi Prasetyo, S.Kom, M.Kom',
            'tahun_ajaran' => '2021/2022',
        ]);
        DB::table('kelas')->insert([
            'kelas' => 4,
            'dosen_pembimbing_akademik' => 'Rahmat Hidayat, S.Kom, M.Kom',
            'tahun_ajaran' => '2020/2021',
        ]);
    }
}
