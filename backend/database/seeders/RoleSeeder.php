<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::updateOrCreate([
            'nama' => 'Admin',

        ]);

        $mahasiswa = Role::updateOrCreate([
            'nama' => 'Mahasiswa',
        ]);

        $alumni = Role::updateOrCreate([
            'nama' => 'Alumni',
        ]);



        $Admin = User::query()->where('role_id', 1)->get();
        $Mahasiswa = User::query()->where('role_id', 2)->get();
        $Alumni = User::query()->where('role_id', 3)->get();

        foreach ($Admin as $admin) {
            $admin->assignRole('Admin');
        }

        foreach ($Mahasiswa as $mahasiswa) {
            $mahasiswa->assignRole('Mahasiswa');
        }

        foreach ($Alumni as $alumni) {
            $alumni->assignRole('Alumni');
        }
    }
}
