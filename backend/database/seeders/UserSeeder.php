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
            'nama' => 'AKBAR DWI MAULANA',
            'username' => '2241270007',
            'email' => 'akbardwi@gmail.com',
            'password' => bcrypt('2241270007'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'ALI FAUZAN KURNIA',
            'username' => '2241270008',
            'email' => 'alifauzan@gmail.com',
            'password' => bcrypt('2241270008'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'ANDRIAN DWI SUSANTO',
            'username' => '2241270016',
            'email' => 'andriandwi@gmail.com',
            'password' => bcrypt('2241270016'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'CALVIN ZHAWA FEBRILIAN AKBAR PRAKOSA',
            'username' => '2241270009',
            'email' => 'calvinzhawa@gmail.com',
            'password' => bcrypt('2241270009'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'DENY PRASETYO',
            'username' => '2241270015',
            'email' => 'denyprasetyo@gmail.com',
            'password' => bcrypt('2241270015'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'DZAKA` YUSUF ARIFIAN',
            'username' => '2241270019',
            'email' => 'dzakayusuf@gmail.com',
            'password' => bcrypt('2241270019'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'EKA FEBRIANTO',
            'username' => '2241270001',
            'email' => 'ekafebrianto@gmail.com',
            'password' => bcrypt('2241270001'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'FANNY RAAFIANSYAH',
            'username' => '2241270012',
            'email' => 'fannyraafiansyah@gmail.com',
            'password' => bcrypt('2241270012'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'GALANG RIFKI MAULANA ROFIANSYAH',
            'username' => '2241270010',
            'email' => 'galangrifki@gmail.com',
            'password' => bcrypt('2241270010'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'MOCH. RIDUWAN',
            'username' => '2241270002',
            'email' => 'mochriduwan@gmail.com',
            'password' => bcrypt('2241270002'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'MOCHAMMAD TAQWIM ICHWANNUDIN',
            'username' => '2241270017',
            'email' => 'mochammadtaqwim@gmail.com',
            'password' => bcrypt('2241270017'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'MOH. ALI IMRON',
            'username' => '2241270003',
            'email' => 'mohali@gmail.com',
            'password' => bcrypt('2241270003'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'MUHAMMAD FAHMI RIZKI RAMADAN',
            'username' => '2241270004',
            'email' => 'muhammadfahmi@gmail.com',
            'password' => bcrypt('2241270004'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'MUHAMMAD HILALLUDIN',
            'username' => '2241270005',
            'email' => 'muhammadhilalludin@gmail.com',
            'password' => bcrypt('2241270005'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'MUHAMMAD ILYAS SAPUTRA',
            'username' => '2241270011',
            'email' => 'muhammadilyas@gmail.com',
            'password' => bcrypt('2241270011'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'MUHAMMAD IZZUL HAQQI',
            'username' => '2241270006',
            'email' => 'muhammadizzul@gmail.com',
            'password' => bcrypt('2241270006'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'MUKHAMAD KHISOM SYAIHUN',
            'username' => '2241270020',
            'email' => 'mukhamadkhisom@gmail.com',
            'password' => bcrypt('2241270020'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'SATRIA YOGA RAMADHANI',
            'username' => '2241270018',
            'email' => 'satriayoga@gmail.com',
            'password' => bcrypt('2241270018'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'SOLACHUDDIN AL AYYUBI',
            'username' => '2241270013',
            'email' => 'solachuddin@gmail.com',
            'password' => bcrypt('2241270013'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'ZUFAR ALIFFIAN RAFIF',
            'username' => '2241270014',
            'email' => 'zufaraliffian@gmail.com',
            'password' => bcrypt('2241270014'),
            'nohp' => '081234567890',
            'kelas_id' => 2,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'AANG ANDIKA PUTRA',
            'username' => '2141270003',
            'email' => 'aangandika@gmail.com',
            'password' => bcrypt('2141270003'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'ABDUL AZIS DWI PRATIKNO',
            'username' => '2141270019',
            'email' => 'abdulazis@gmail.com',
            'password' => bcrypt('2141270019'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'AKHMAD UBAYDILLAH',
            'username' => '2141270007',
            'email' => 'akhmadubaydillah@gmail.com',
            'password' => bcrypt('2141270007'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'AKMALLUDIN JADIDI',
            'username' => '2141270022',
            'email' => 'akmalludinjadidi@gmail.com',
            'password' => bcrypt('2141270022'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'ANDRE KUKUH PRASETYO',
            'username' => '2141270015',
            'email' => 'andrekukuh@gmail.com',
            'password' => bcrypt('2141270015'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'BIMA SEGARA DANI',
            'username' => '2141270013',
            'email' => 'bimasegara@gmail.com',
            'password' => bcrypt('2141270013'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'FERDA WAHYU SYAHRIAL',
            'username' => '2141270018',
            'email' => 'ferdawahyu@gmail.com',
            'password' => bcrypt('2141270018'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'FRIDDLEY FEFRIALEY SUGIANTO',
            'username' => '2141270006',
            'email' => 'friddleyfefrialey@gmail.com',
            'password' => bcrypt('2141270006'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'FUDHOLI SISWANTO',
            'username' => '2141270002',
            'email' => 'fudholisiswanto@gmail.com',
            'password' => bcrypt('2141270002'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'GHALIB ACHMAD',
            'username' => '2141270012',
            'email' => 'ghalibachmad@gmail.com',
            'password' => bcrypt('2141270012'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'ITSNAN RAHMADHAN',
            'username' => '2141270004',
            'email' => 'itsnanrahmadhan@gmail.com',
            'password' => bcrypt('2141270004'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'JEFRI NUR DIANSYAH',
            'username' => '2141270005',
            'email' => 'jefrinur@gmail.com',
            'password' => bcrypt('2141270005'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'JORDAN FILIX FEBIANTO',
            'username' => '2141270001',
            'email' => 'jordanfilix@gmail.com',
            'password' => bcrypt('2141270001'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'M. RAFLI PUTRA WARDANA',
            'username' => '2141270014',
            'email' => 'mrafli@gmail.com',
            'password' => bcrypt('2141270014'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'MOCHAMMAD JEREMY JUNIARTO',
            'username' => '2141270016',
            'email' => 'mochammadjeremy@gmail.com',
            'password' => bcrypt('2141270016'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'MUHAMMAD ARDIANSYAH',
            'username' => '2141270010',
            'email' => 'muhammadardiansyah@gmail.com',
            'password' => bcrypt('2141270010'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'MUHAMMAD FAHRUL AMRULLAH ZULFI',
            'username' => '2141270024',
            'email' => 'muhammadfahrul@gmail.com',
            'password' => bcrypt('2141270024'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'MUHAMMAD GALANG ARDIANTORO',
            'username' => '2141270009',
            'email' => 'muhammadgalang@gmail.com',
            'password' => bcrypt('2141270009'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'MUHAMMAD WIJAYA KUSUMA',
            'username' => '2141270025',
            'email' => 'muhammadwijaya@gmail.com',
            'password' => bcrypt('2141270025'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'MUSTOFA KHILMI',
            'username' => '2141270020',
            'email' => 'mustofakhilmi@gmail.com',
            'password' => bcrypt('2141270020'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'NURUL FITRAH RAHMADHANI',
            'username' => '2141270011',
            'email' => 'nurulfitrah@gmail.com',
            'password' => bcrypt('2141270011'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'RAJANDRA SYAHRAN WISESA',
            'username' => '2141270023',
            'email' => 'rajandrasyahran@gmail.com',
            'password' => bcrypt('2141270023'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'ROYKHAN ZAHRUR RIZQI',
            'username' => '2141270021',
            'email' => 'roykhanzahrur@gmail.com',
            'password' => bcrypt('2141270021'),
            'nohp' => '081234567890',
            'kelas_id' => 3,
            'role_id' => 2,
            'foto' => null,
        ]);

        DB::table('users')->insert([
            'nama' => 'SASONO HARIS PRABOWO',
            'username' => '2141270008',
            'email' => 'sasonoharis@gmail.com',
            'password' => bcrypt('2141270008'),
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
