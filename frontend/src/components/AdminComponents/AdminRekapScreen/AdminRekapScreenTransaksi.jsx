import PropTypes from "prop-types";
import { logoImage } from "../../../assets";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";

const AdminRekapScreenTransaksi = ({ selectedMonth, selectedYear }) => {
  const { data: countAllDataTransaksi } = useFetchOnMount({
    url: "/countall",
    method: "GET"
  })  

  return (
    <div className="flex justify-center mb-10">
      <div className="w-[21cm] h-[29.7cm] bg-white shadow-md font-serif p-[3cm]">
        <div className="h-full">
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

          <div className="mb-5">
            <p className="font-bold text-md">Rekap Transaksi Peminjaman dan Pengembalian</p>
            <p>Bulan {selectedMonth} {selectedYear}</p>
          </div>

          <div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-[10%] text-sm border bg-blue-400 text-white font-medium p-1">No</th>
                  <th className="w-[70%] text-sm border bg-blue-400 text-white font-medium p-1 text-left">Jenis Transaksi</th>
                  <th className="w-[20%] text-sm border bg-blue-400 text-white font-medium p-1">Total Aktivitas</th>                  
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-1 text-sm border text-center">1</td>
                  <td className="p-1 text-sm border">Peminjaman</td>
                  <td className="p-1 text-sm border">{countAllDataTransaksi["Peminjaman: "]}</td>
                </tr>
                <tr>
                  <td className="p-1 text-sm border text-center">2</td>
                  <td className="p-1 text-sm border">Pengembalian</td>
                  <td className="p-1 text-sm border">{countAllDataTransaksi["Pengembalian: "]}</td>
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
  selectedYear: PropTypes.any
}

export default AdminRekapScreenTransaksi;
