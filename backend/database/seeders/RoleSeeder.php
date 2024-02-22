<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::updateOrCreate([
            'name' => 'Admin',
            'guard_name' => 'api',

        ]);

        $mahasiswa = Role::updateOrCreate([
            'name' => 'Mahasiswa',
            'guard_name' => 'api',
        ]);


        $view_user = Permission::updateOrCreate(
            [
                'name' => 'view_user',
                'guard_name' => 'api',
            ],
            [
                'name' => 'view_user',
                'guard_name' => 'api',
            ],
        );

        $view_role = Permission::updateOrCreate(
            [
                'name' => 'view_role',
                'guard_name' => 'api',
            ],
            [
                'name' => 'view_role',
                'guard_name' => 'api',
            ],
        );

        $view_barang = Permission::updateOrCreate(
            [
                'name' => 'view_barang',
                'guard_name' => 'api',
            ],
            [
                'name' => 'view_barang',
                'guard_name' => 'api',
            ],
        );

        $view_kelas = Permission::updateOrCreate(
            [
                'name' => 'view_kelas',
                'guard_name' => 'api',
            ],
            [
                'name' => 'view_kelas',
                'guard_name' => 'api',
            ],
        );

        $view_kategori = Permission::updateOrCreate(
            [
                'name' => 'view_kategori',
                'guard_name' => 'api',
            ],
            [
                'name' => 'view_kategori',
                'guard_name' => 'api',
            ],
        );

        $view_peminjaman = Permission::updateOrCreate(
            [
                'name' => 'view_peminjaman',
                'guard_name' => 'api',
            ],
            [
                'name' => 'view_peminjaman',
                'guard_name' => 'api',
            ],
        );

        $view_pengembalian = Permission::updateOrCreate(
            [
                'name' => 'view_pengembalian',
                'guard_name' => 'api',
            ],
            [
                'name' => 'view_pengembalian',
                'guard_name' => 'api',
            ],
        );

        $admin->givePermissionTo([
            $view_user,
            $view_role,
            $view_barang,
            $view_kelas,
            $view_kategori,
            $view_peminjaman,
            $view_pengembalian,
        ]);

        $mahasiswa->givePermissionTo([
            $view_barang,
            $view_peminjaman,
            $view_pengembalian,
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
