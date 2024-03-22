<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $barang = [
            'Tang cucut',
            'Tang kombinasi',
            'Tang potong',
            'Obeng -',
            'Obeng +',
            'Kunci pas 1set',
            'Kunci ring 1 set',
            'Palu karet',
            'Palu besi',
            'Avo analog',
            'Avo digital',
            'Solder',
            'Tinol',
            'Arpus',
            'Sedotan timah',
            'Tang kabel',
            'Termo meter',
            'Tachometer',
            'Timming light',
            'Kunci shok set',
            'Kunci shok ukuran',
            'Kunci L segi 6 set',
            'Kunci L bintang set',
            'Kunci L ukuran',
            'Kunci pas ukuran',
            'Pahat betle',
            'Kunci inggris',
            'Kunci pipa',
            'Stang shok model',
            'Kunci alpa',
            'Stelan klep motor',
            'Kikir besar bulat',
            'Kikir besar setengah bulat',
            'Kikir besar segitiga',
            'Kikir kecil model',
            'Bore tuner',
            'Mata bore tuner model',
            'Bore tangan listrik',
            'Gerinda tangan',
            'Mata bore ukuran',
            'Mata bor pagoda',
            'Dial bore gauge',
            'Stregh eigth',
            'Radiator cup tester',
            'Compression test',
            'Treker model',
            'Jack stand',
            'Dongkrak jack flour',
            'Jangka sorong ukuran',
            'Mikro meter ukuran',
            'Penggores',
            'Dial indikator',
            'Stand magnet dial',
            'Ketok angka',
            'Ketok huruf'
        ];

        $counter = 1;

        foreach ($barang as $nama_barang) {
            DB::table('barang')->insert([
                'kategori_id' => 1,
                'nama_barang' => $nama_barang,
                'kode_barang' => 'A10' . strtoupper(substr( 0, 1)) . $counter,
                'jumlah_barang' => rand(1, 20),
            ]);
            $counter++;
        }

        $bahan = [
            'Baut',
            'Mur',
            'Ring',
            'Paku',
            'lem',
            'Kabel',
            'Kunci',
            'Paku',
            'Besi',
            'Plastik',
            'Karet',
            'Kain',
            'Kertas',
            'Kaca',
            'Kayu',
            'Alumunium',
        ];

        $counter = 1;

        foreach ($bahan as $nama_barang) {
            DB::table('barang')->insert([
                'kategori_id' => 2,
                'nama_barang' => $nama_barang,
                'kode_barang' => 'A20' . strtoupper(substr( 0, 1)) . $counter,
                'jumlah_barang' => rand(1, 20),
            ]);
            $counter++;
        }

    }


}
