<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NotifikasiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('notifikasi')->insert([
            'user_id' => 3,
            'pesan' => 'Selamat datang di aplikasi ini',
            'dibaca' => 0,
        ]);
        DB::table('notifikasi')->insert([
            'user_id' => 2,
            'pesan' => 'Selamat datang di aplikasi ini',
            'dibaca' => 0,
        ]);
        DB::table('notifikasi')->insert([
            'user_id' => 2,
            'pesan' => 'Selamat datang di aplikasi ini',
            'dibaca' => 0,
        ]);
        DB::table('notifikasi')->insert([
            'user_id' => 2,
            'pesan' => 'Selamat datang di aplikasi ini',
            'dibaca' => 0,
        ]);
        DB::table('notifikasi')->insert([
            'user_id' => 2,
            'pesan' => 'Selamat datang di aplikasi ini',
            'dibaca' => 0,
        ]);
        DB::table('notifikasi')->insert([
            'user_id' => 2,
            'pesan' => 'Selamat datang di aplikasi ini',
            'dibaca' => 0,
        ]);
        DB::table('notifikasi')->insert([
            'user_id' => 2,
            'pesan' => 'Selamat datang di aplikasi ini',
            'dibaca' => 0,
        ]);
    }
}
