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
            'name' => 'Admin',

        ]);

        $mahasiswa = Role::updateOrCreate([
            'name' => 'Mahasiswa',
        ]);

        $alumni = Role::updateOrCreate([
            'name' => 'Alumni',
        ]);



        $Admin = User::query()->where('role_id', 1)->get();
        $Mahasiswa = User::query()->where('role_id', 2)->get();

        foreach ($Admin as $admin) {
            $admin->assignRole('Admin');
        }

        foreach ($Mahasiswa as $mahasiswa) {
            $mahasiswa->assignRole('Mahasiswa');
        }
    }
}
