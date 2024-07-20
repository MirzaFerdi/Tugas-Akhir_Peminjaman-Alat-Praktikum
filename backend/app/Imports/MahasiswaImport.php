<?php

namespace App\Imports;

use App\Models\Kelas;
use App\Models\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class MahasiswaImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        $row['kelas'] = Kelas::where("kelas", "like", "%" . $row['kelas'] . "%")->first()->id;

        return new User([
            'nama' => $row['nama'],
            'username' => $row['nim'],
            'email' => $row['email'],
            'password' => bcrypt($row['nim']),
            'nohp' => $row['nohp'],
            'kelas_id' => $row['kelas'],
            'role_id' => 2,
        ]);
    }
}
