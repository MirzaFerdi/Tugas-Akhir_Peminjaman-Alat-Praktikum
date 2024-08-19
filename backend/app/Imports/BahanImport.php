<?php

namespace App\Imports;

use App\Models\Barang;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class BahanImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        return new Barang([
            'kategori_id' => 2,
            'kode_barang' => $row['kode_barang'],
            'nama_barang' => $row['nama_barang'],
            'stok_awal' => $row['stok_awal'],
            'stok_tersedia' => $row['stok_tersedia'],
        ]);
    }
}
