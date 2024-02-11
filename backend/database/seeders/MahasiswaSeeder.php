<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class MahasiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('admin')->insert([
            'nip' => Int::random(5),
            'nama_mahasiswa' => 'mahasiswa',
            'email' => Str::random(7).'@gmail.com',
            'password' => Hash::make('password'),
            'nohp' => Int::random(16),
        ]);
    }
}
