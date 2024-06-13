<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use function Laravel\Prompts\table;

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
            'kelas_id' => null,
            'role_id' => 1,
            'foto' => null,
        ]);
        DB::table('users')->insert([
            'nama' => 'Budi Santoso',
            'username' => '2131740010',
            'email' => 'budi@gmail.com',
            'password' => bcrypt('budi123'),
            'nohp' => '081234567890',
            'kelas_id' => 1,
            'role_id' => 2,
            'foto' => null,
        ]);
        DB::table('users')->insert([
            'nama' => 'Cahyo Prasetyo',
            'username' => '2131740011',
            'email' => 'cahyo@gmail.com',
            'password' => bcrypt('cahyo123'),
            'nohp' => '081234567890',
            'kelas_id' => 1,
            'role_id' => 2,
            'foto' => null,
        ]);
        DB::table('users')->insert([
            'nama' => 'Gunawan Wijaya',
            'username' => '2131740012',
            'email' => 'wijaya@gmail.com',
            'password' => bcrypt('wijaya123'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);
        DB::table('users')->insert([
            'nama' => 'Putri Ayu',
            'username' => '2131740013',
            'email' => 'putri@gmail.com',
            'password' => bcrypt('putri123'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);
        DB::table('users')->insert([
            'nama' => 'Dewi Lestari',
            'username' => '2131740014',
            'email' => 'dewi@gmail.com',
            'password' => bcrypt('dewi123'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);
        DB::table('users')->insert([
            'nama' => 'Very Setiawan',
            'username' => '2131740015',
            'email' => 'very@gmail.com',
            'password' => bcrypt('very123'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);
        DB::table('users')->insert([
            'nama' => 'Eko Prasetyo',
            'username' => '2131740016',
            'email' => 'eko@gmail.com',
            'password' => bcrypt('eko123'),
            'nohp' => '081234567890',
            'kelas_id' => 4,
            'role_id' => 2,
            'foto' => null,
        ]);
        DB::table('users')->insert([
            'nama' => 'Rudi Santo',
            'username' => '2131740017',
            'email' => 'rudi@gmail.com',
            'password' => bcrypt('rudi123'),
            'nohp' => '081234567890',
            'kelas_id' => 4,
            'role_id' => 2,
            'foto' => null,
        ]);
        DB::table('users')->insert([
            'nama' => 'Boris',
            'username' => '2131740018',
            'email' => 'borisis404@gmail.com',
            'password' => bcrypt('boris123'),
            'nohp' => '081234567890',
            'kelas_id' => 4,
            'role_id' => 2,
            'foto' => null,
        ]);
        DB::table('users')->insert([
            'nama' => 'Rafly Dioniswara Pramono',
            'username' => '2131740054',
            'email' => 'raflypram368@gmail.com',
            'password' => bcrypt('skodsa123'),
            'nohp' => '081234567890',
            'kelas_id' => 4,
            'role_id' => 2,
            'foto' => null,
        ]);

    }
}
