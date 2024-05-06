import React from "react";
import PropTypes from "prop-types";
import { logoImage, qrCodeImage } from "../../../assets";
import { date } from "../../../utils/datetime";

const AdminRekapScreenDocument = ({ selectedMonth, selectedYear }) => {
  return (
    <React.Fragment>
      <div className="w-[21cm] h-[29.7cm] flex justify-center mb-10">
        <div id="document1" className="w-[21cm] h-[29.7cm] bg-white shadow-md font-serif text-sm p-[3cm]">
          <div className="h-full">
            <div className="flex justify-around items-center mb-2">
              <img src={logoImage} alt="Logo Polinema" width={100} height={100} className="aspect-square" />
              <div>
                <h1 className="text-center">KEMENTRIAN PENDIDIKAN, KEBUDAYAAN,</h1>
                <h1 className="text-center">RISET, DAN TEKNOLOGI</h1>
                <h1 className="text-center">POLITEKNIK NEGERI MALANG</h1>
                <h1 className="text-center font-bold">PROGRAM STUDI DILUAR KAMPUS UTAMA (PSDKU)</h1>
                <h1 className="text-center font-bold mb-2">KABUPATEN LUMAJANG</h1>
                <p className="text-center">Jalan Lintas Timur - 67311</p>
                <p className="text-center">Telp. (0334) 8786800</p>
                <p className="text-center">Website: www.polinema.ac.id - Email:psdku.lumajang@polinema.ac.id</p>
              </div>
            </div>

            <div className="bg-zinc-800 h-[0.1rem] mb-[0.1rem]"></div>
            <div className="bg-zinc-800 h-[0.2rem] mb-5"></div>

            <div className="flex flex-col items-end mb-5">
              <p>Lumajang</p>
              <p>{date(new Date())}</p>
            </div>

            <table className="mb-5">
              <tbody>
                <tr>
                  <td className="pr-5">Lampiran</td>
                  <td className="pr-1">:</td>
                  <td>2 (dua) lembar</td>
                </tr>
                <tr>
                  <td>Perihal</td>
                  <td className="pr-1">:</td>
                  <td valign="baseline">
                    Pencatatan Rekap Data Bulanan Transaksi Peminjaman dan Pengembalian Alat dan Bahan Praktikum di
                    Bengkel TRO.
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mb-5">
              <p className="font-bold">Kepada:</p>
              <p>Admin Jurusan Teknologi Rekayasa Otomotif.</p>
            </div>

            <div className="mb-5">
              <p className="text-justify">
                Sehubungan dengan pengerjaan pelaksanaan Tugas Akhir 2023-2024, dengan ini kami membuat laporan dari
                hasil pencatatan Transaksi Peminjaman dan Pengembalian Alat D-IV Teknologi Rekayasa Otomotif PSDKU
                Lumajang (terlampir), yang dapat diunduh secara langsung menggunakan tampilan tombol unduh yang
                tersedia. Berikut ini merupakan detail dokumen yang akan diunduh,
              </p>
            </div>

            <table className="mb-5">
              <tbody>
                <tr>
                  <td className="pr-10">Bulan Rekap</td>
                  <td className="pr-1">:</td>
                  <td>{selectedMonth}</td>
                </tr>
                <tr>
                  <td className="pr-10">Tahun Rekap</td>
                  <td className="pr-1">:</td>
                  <td>{selectedYear}</td>
                </tr>
                <tr>
                  <td className="pr-10">Jumlah Halaman</td>
                  <td className="pr-1">:</td>
                  <td>5 (lima) halaman</td>
                </tr>
                <tr>
                  <td className="pr-10">Nama File Unduhan</td>
                  <td className="pr-1">:</td>
                  <td>
                    Laporan Peminjaman Bengkel TRO, Bulan {selectedMonth} Tahun {selectedYear}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mb-5">
              <p>
                Demikian surat pemberitahuan ini kami sampaikan, atas perhatian dan kerjasamanya kami sampaikan terima
                kasih.
              </p>
            </div>

            <div className="flex flex-col items-end">
              <div>
                <p>Koordinator Program Studi</p>
                <p className="mb-1">D-IV Teknologi Rekayasa Otomotif</p>
                <img src={qrCodeImage} alt="Fake QR Code Image" className="w-28 mb-1" />
                <p className="underline">Yuniarto Agus Winoko, S.T., M.T.</p>
                <p>NIP. 196306011988031004</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

AdminRekapScreenDocument.propTypes = {
  selectedMonth: PropTypes.any,
  selectedYear: PropTypes.any,
};

export default AdminRekapScreenDocument;
