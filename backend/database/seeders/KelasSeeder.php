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
            'kelas' => 'Kelas 1',
            'dpa' => 'Alvionithasari S.Kom, M.Kom',
            'tahun_ajaran' => '2023/2024',
        ]);
        DB::table('kelas')->insert([
            'kelas' => 'Kelas 2',
            'dpa' => 'Very Sugiarto, S.Kom, M.Kom',
            'tahun_ajaran' => '2022/2023',
        ]);
        DB::table('kelas')->insert([
            'kelas' => 'Kelas 3',
            'dpa' => 'Gunawan Budi Prasetyo, S.Kom, M.Kom',
            'tahun_ajaran' => '2021/2022',
        ]);
        DB::table('kelas')->insert([
            'kelas' => 'Kelas 4',
            'dpa' => 'Rahmat Hidayat, S.Kom, M.Kom',
            'tahun_ajaran' => '2020/2021',
        ]);
        DB::table('kelas')->insert([
            'kelas' => 'Alumni',
            'dpa' => 'Alumni',
            'tahun_ajaran' => '2023/2024',
        ]);
    }
}
