<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'nama' => 'Abdul Aziz',
            'username' => '2121740012',
            'email' => 'abdul@gmail.com',
            'password' => bcrypt('abdul123'),
            'nohp' => '081234567890',
            'role_id' => 1
        ]);
        DB::table('users')->insert([
            'nama' => 'Budi Santoso',
            'username' => '2131740010',
            'email' => 'budi@gmail.com',
            'password' => bcrypt('budi123'),
            'nohp' => '081234567890',
            'role_id' => 2
        ]);
        DB::table('users')->insert([
            'nama' => 'Gunawan Wijaya',
            'username' => '2131740011',
            'email' => 'wijaya@gmail.com',
            'password' => bcrypt('wijaya123'),
            'nohp' => '081234567890',
            'role_id' => 2
        ]);
    }
}
