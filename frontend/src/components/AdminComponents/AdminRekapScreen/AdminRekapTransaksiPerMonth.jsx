import PropTypes from "prop-types";
import { logoImage } from "../../../assets";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";
import { date, time } from "../../../utils/datetime";

const AdminRekapTransaksiPerMonth = ({ selectedMonth, selectedYear }) => {
  const { data: rekapDataPeminjaman } = useFetchOnMount({
    url: `/peminjaman/rekap/${selectedMonth}/${selectedYear}`,
    method: "GET",
  });

  return (
    <div className="w-[21cm] h-[29.7cm] flex justify-center mb-10 overflow-x-auto">
      <div id="document3" className="w-[21cm] h-[29.7cm] bg-white shadow-md font-serif p-[7.087rem]">
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
            <p className="font-bold text-md">Detail Rekap Data Transaksi Peminjaman</p>
          </div>

          <div className="w-full mb-5">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-[5%] text-sm tracking-wide bg-blue-400 text-white font-medium border p-2">No</th>
                  <th className="w-[35%] text-sm tracking-wide bg-blue-400 text-white font-medium border p-2 text-left">Mahasiswa</th>
                  <th className="w-[20%] text-sm tracking-wide bg-blue-400 text-white font-medium border p-2 text-left">Barang</th>
                  <th className="w-[25%] text-sm tracking-wide bg-blue-400 text-white font-medium border p-2 text-left">Tanggal</th>
                  <th className="w-[15%] text-sm tracking-wide bg-blue-400 text-white font-medium border p-2 text-left">Jenis</th>
                </tr>
              </thead>
              <tbody>
                {rekapDataPeminjaman?.success === true ? (
                  rekapDataPeminjaman?.peminjaman?.map((values, index) => {
                    const { id, user, barang, tanggal_peminjaman } = values;

                    return (
                      <tr key={id}>
                        <td className="border text-xs tracking-wide p-1 text-center">{index + 1}</td>
                        <td className="border text-xs tracking-wide p-1 text-start">
                          <p className="font-semibold">{user?.nama}</p>
                          <p className="text-zinc-500">{user?.username} | Kelas{user?.kelas_id}</p>                          
                        </td>
                        <td className="border text-xs tracking-wide p-1 text-start">
                          <p className="font-semibold">{barang?.nama_barang}</p>
                          <p className="text-zinc-500">{barang?.kode_barang}</p>
                        </td>
                        <td className="border text-xs tracking-wide p-1 text-start">
                          <p className="font-semibold">{date(tanggal_peminjaman)}</p>
                          <p className="text-zinc-500">{time(tanggal_peminjaman)} wib</p>
                        </td>
                        <td className="border text-xs tracking-wide p-1 text-start">
                          Peminjaman
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="p-1 text-sm text-center">{rekapDataPeminjaman?.message}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mb-1">
            <p className="font-bold text-md">Detail Rekap Data Transaksi Pengembalian</p>
          </div>

          <div className="w-full mb-5">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-[5%] text-sm tracking-wide bg-blue-400 text-white font-medium border p-2">No</th>
                  <th className="w-[35%] text-sm tracking-wide bg-blue-400 text-white font-medium border p-2 text-left">Mahasiswa</th>
                  <th className="w-[20%] text-sm tracking-wide bg-blue-400 text-white font-medium border p-2 text-left">Barang</th>
                  <th className="w-[25%] text-sm tracking-wide bg-blue-400 text-white font-medium border p-2 text-left">Tanggal</th>
                  <th className="w-[15%] text-sm tracking-wide bg-blue-400 text-white font-medium border p-2 text-left">Jenis</th>
                </tr>
              </thead>
              <tbody>
                {rekapDataPeminjaman?.success === true ? (
                  rekapDataPeminjaman?.pengembalian?.map((values, index) => {
                    const { id, user, barang, tanggal_pengembalian } = values;

                    return (
                      <tr key={id}>
                        <td className="border text-xs tracking-wide p-1 text-center">{index + 1}</td>
                        <td className="border text-xs tracking-wide p-1 text-start">
                          <p className="font-semibold">{user?.nama}</p>
                          <p className="text-zinc-500">{user?.username} | Kelas{user?.kelas_id}</p>                          
                        </td>
                        <td className="border text-xs tracking-wide p-1 text-start">
                          <p className="font-semibold">{barang?.nama_barang}</p>
                          <p className="text-zinc-500">{barang?.kode_barang}</p>
                        </td>
                        <td className="border text-xs tracking-wide p-1 text-start">
                          <p className="font-semibold">{date(tanggal_pengembalian)}</p>
                          <p className="text-zinc-500">{time(tanggal_pengembalian)} wib</p>
                        </td>
                        <td className="border text-xs tracking-wide p-1 text-start">
                          Pengembalian
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="p-1 text-sm text-center">{rekapDataPeminjaman?.message}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

AdminRekapTransaksiPerMonth.propTypes = {
  selectedMonth: PropTypes.any,
  selectedYear: PropTypes.any,
};

export default AdminRekapTransaksiPerMonth;
