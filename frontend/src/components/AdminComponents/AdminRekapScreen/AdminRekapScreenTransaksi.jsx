import PropTypes from "prop-types";
import { logoImage } from "../../../assets";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";

const AdminRekapScreenTransaksi = ({ selectedMonth, selectedYear }) => {
  const { data: countAllData } = useFetchOnMount({
    url: "/countall",
    method: "GET",
  });

  const { data: mahasiswaKelas1 } = useFetchOnMount({
    url: "/user/kelas/1",
    method: "GET",
  });

  
  const { data: mahasiswaKelas2 } = useFetchOnMount({
    url: "/user/kelas/2",
    method: "GET",
  });
  
  const { data: mahasiswaKelas3 } = useFetchOnMount({
    url: "/user/kelas/3",
    method: "GET",
  });
  
  const { data: mahasiswaKelas4 } = useFetchOnMount({
    url: "/user/kelas/4",
    method: "GET",
  });
    
  const { data: dataAlat } = useFetchOnMount({
    url: "/barang/kategori/1",
    method: "GET",
  });

  const { data: dataBahan } = useFetchOnMount({
    url: "/barang/kategori/2",
    method: "GET",
  });

  return (
    <div className="w-[21cm] h-[29.7cm] flex justify-center mb-10 overflow-x-auto">
      <div id="document2" className="w-[21cm] h-[29.7cm] bg-white shadow-md font-serif p-[7.087rem]">
        <div className="w-full h-full">
          {/* screen rekap document header */}
          <div className="flex justify-around items-center mb-2">
            <img src={logoImage} alt="Logo Polinema" width={100} height={100} className="aspect-square" />
            <div>
              <h1 className="text-sm text-center">KEMENTRIAN PENDIDIKAN, KEBUDAYAAN,</h1>
              <h1 className="text-sm text-center">RISET, DAN TEKNOLOGI</h1>
              <h1 className="text-sm text-center">POLITEKNIK NEGERI MALANG</h1>
              <h1 className="text-sm text-center font-bold">PROGRAM STUDI DILUAR KAMPUS UTAMA (PSDKU)</h1>
              <h1 className="text-sm text-center font-bold mb-2">KABUPATEN LUMAJANG</h1>
              <p className="text-sm text-center">Jalan Lintas Timur - 67311</p>
              <p className="text-sm text-center">Telp. (0334) 8786800</p>
              <p className="text-sm text-center">Website: www.polinema.ac.id - Email:psdku.lumajang@polinema.ac.id</p>
            </div>
          </div>

          <div className="bg-zinc-800 h-[0.1rem] mb-[0.1rem]"></div>
          <div className="bg-zinc-800 h-[0.2rem] mb-5"></div>

          <div className="mb-1">
            <p className="font-bold text-md">Rekap Data Akun Mahasiswa</p>
          </div>

          <div className="w-full mb-5">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-[10%] text-sm bg-blue-400 text-white font-medium border p-1">No</th>
                  <th className="w-[70%] text-sm bg-blue-400 text-white font-medium border p-1 text-left">
                    Kelas Mahasiswa
                  </th>
                  <th className="w-[20%] text-sm bg-blue-400 text-white font-medium border p-1">Total Mahasiswa</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-1 text-sm text-center">1</td>
                  <td className="border p-1 text-sm">Mahasiswa Kelas 1</td>
                  <td className="border p-1 text-sm text-center">{mahasiswaKelas1?.total}</td>
                </tr>
                <tr>
                  <td className="border p-1 text-sm text-center">2</td>
                  <td className="border p-1 text-sm">Mahasiswa Kelas 2</td>
                  <td className="border p-1 text-sm text-center">{mahasiswaKelas2?.total}</td>
                </tr>
                <tr>
                  <td className="border p-1 text-sm text-center">3</td>
                  <td className="border p-1 text-sm">Mahasiswa Kelas 3</td>
                  <td className="border p-1 text-sm text-center">{mahasiswaKelas3?.total}</td>
                </tr>
                <tr>
                  <td className="border p-1 text-sm text-center">4</td>
                  <td className="border p-1 text-sm">Mahasiswa Kelas 4</td>
                  <td className="border p-1 text-sm text-center">{mahasiswaKelas4?.total}</td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-1 text-sm text-center font-semibold">
                    Total
                  </td>
                  <td className="border p-1 text-sm text-center font-semibold">{countAllData["User: "]}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-1">
            <p className="font-bold text-md">Rekap Data Barang Praktikum</p>
          </div>

          <div className="mb-5">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-[10%] text-sm bg-blue-400 text-white font-medium border p-1">No</th>
                  <th className="w-[70%] text-sm bg-blue-400 text-white font-medium border p-1 text-left">
                    Kelas Mahasiswa
                  </th>
                  <th className="w-[20%] text-sm bg-blue-400 text-white font-medium border p-1">Total Mahasiswa</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-1 text-sm text-center">1</td>
                  <td className="border p-1 text-sm">Alat Praktikum</td>
                  <td className="border p-1 text-sm text-center">{dataAlat?.length}</td>
                </tr>
                <tr>
                  <td className="border p-1 text-sm text-center">2</td>
                  <td className="border p-1 text-sm">Bahan Praktikum</td>
                  <td className="border p-1 text-sm text-center">{dataBahan?.length}</td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-1 text-sm text-center font-semibold">
                    Total
                  </td>
                  <td className="border p-1 text-sm text-center font-semibold">{countAllData["Barang: "]}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mb-1">
            <p className="font-bold text-md">Rekap Transaksi Peminjaman dan Pengembalian</p>
            <p className="text-zinc-500 text-sm">
              Bulan {selectedMonth} {selectedYear}
            </p>
          </div>

          <div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-[10%] text-sm bg-blue-400 text-white font-medium border p-1">No</th>
                  <th className="w-[70%] text-sm bg-blue-400 text-white font-medium border p-1 text-left">
                    Jenis Transaksi
                  </th>
                  <th className="w-[20%] text-sm bg-blue-400 text-white font-medium border p-1">Total Aktivitas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-1 text-sm text-center">1</td>
                  <td className="border p-1 text-sm">Peminjaman</td>
                  <td className="border p-1 text-sm text-center">{countAllData["Peminjaman: "]}</td>
                </tr>
                <tr>
                  <td className="border p-1 text-sm text-center">2</td>
                  <td className="border p-1 text-sm">Pengembalian</td>
                  <td className="border p-1 text-sm text-center">{countAllData["Pengembalian: "]}</td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-1 text-sm text-center font-semibold">
                    Total
                  </td>
                  <td className="border p-1 text-sm text-center font-semibold">
                    {parseInt(countAllData["Peminjaman: "]) + parseInt(countAllData["Pengembalian: "]) || "0"} 
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

AdminRekapScreenTransaksi.propTypes = {
  selectedMonth: PropTypes.any,
  selectedYear: PropTypes.any,
};

export default AdminRekapScreenTransaksi;
