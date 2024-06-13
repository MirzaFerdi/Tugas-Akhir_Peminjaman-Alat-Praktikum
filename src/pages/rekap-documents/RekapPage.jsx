import React from "react";
import RekapHeader from "./RekapHeader";
import { useParams } from "react-router-dom";
import { qrCodeImage } from "../../assets";
import { useFetchOnMount } from "../../hooks/useFetchOnMount";
import RekapPengembalian from "./RekapPengembalian";
import RekapPeminjaman from "./RekapPeminjaman";
import { getNamaBulan } from "../../utils/datetime";

const RekapPage = () => {
  const { month, year } = useParams();

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
  const { data: dataPeminjaman } = useFetchOnMount({
    url: "/peminjaman",
    method: "GET",
  });
  const { data: dataPengembalian } = useFetchOnMount({
    url: "/pengembalian",
    method: "GET",
  });
  const { data: dataDetailTransaksi } = useFetchOnMount({
    url: `/peminjaman/transaksi/bulanan/${month}/${year}`,
    method: "GET",
  });

  return (
    <React.Fragment>
      {/* Recap Opening Page */}
      <div id="document-1" className="w-[21cm] h-[29.7cm] shadow-md p-[3cm] font-serif bg-white">
        <div className="h-full">
          <RekapHeader />
          <table className="w-full mb-4">
            <tbody>
              <tr>
                <td className="text-sm w-[20%]">
                  <p className="mr-3">Lampiran</p>
                </td>
                <td className="text-sm">
                  <p className="mr-2">:</p>
                </td>
                <td className="text-sm">{1 + (dataPeminjaman?.last_page + dataPengembalian?.last_page)} lembar</td>
              </tr>
              <tr>
                <td className="text-sm align-top">Perihal</td>
                <td className="text-sm align-top">:</td>
                <td className="text-sm">
                  Hasil Pencatatan Rekap Data Bulanan Transaksi Peminjaman dan Pengembalian pada Bengkel TRO Polinema
                  PSDKU Lumajang.
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mb-4">
            <p className="text-sm font-semibold">Kepada:</p>
            <p className="text-sm">Admin Jurusan Rekayasa Otomotif</p>
          </div>

          <div className="mb-5">
            <p className="text-sm indent-12 text-justify">
              Sehubungan dengan pengerjaan pelaksanaan Tugas Akhir 2023-2024, dengan ini kami membuat laporan dari hasil
              pencatatan Transaksi Peminjaman dan Pengembalian Alat D-IV Teknologi Rekayasa Otomotif PSDKU Lumajang
              (terlampir), yang dapat diunduh secara langsung menggunakan tampilan tombol unduh yang tersedia. Berikut
              ini merupakan detail dokumen yang akan diunduh,
            </p>
          </div>

          <table className="w-full mb-5">
            <tbody>
              <tr>
                <td className="text-sm w-[30%]">
                  <p className="mr-3">Bulan</p>
                </td>
                <td className="text-sm">
                  <p className="mr-2">:</p>
                </td>
                <td className="text-sm">{getNamaBulan(parseInt(month))}</td>
              </tr>
              <tr>
                <td className="text-sm align-top">Tahun</td>
                <td className="text-sm align-top">:</td>
                <td className="text-sm">{year}</td>
              </tr>
              <tr>
                <td className="text-sm align-top">Jumlah Halaman</td>
                <td className="text-sm align-top">:</td>
                <td className="text-sm">{2 + (dataPeminjaman?.last_page + dataPengembalian?.last_page)} Halaman</td>
              </tr>
              <tr>
                <td className="text-sm align-top">Format Dokumen</td>
                <td className="text-sm align-top">:</td>
                <td className="text-sm">PDF (.pdf)</td>
              </tr>
              <tr>
                <td className="text-sm align-top">Nama File Dokumen</td>
                <td className="text-sm align-top">:</td>
                <td className="text-sm">
                  [Dokumen Rekap] - Rekap Data Peminjaman Alat dan Bahan Praktikum Bulan {getNamaBulan(parseInt(month))}{" "}
                  Tahun 2024.pdf
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mb-5">
            <p className="text-sm indent-12 text-justify">
              Demikian surat pemberitahuan ini kami sampaikan, atas perhatian dan kerjasamanya kami sampaikan terima
              kasih.
            </p>
          </div>

          <div className="flex flex-col items-end">
            <p className="text-sm">Koordinator Program Studi</p>
            <p className="text-sm mb-2">D-IV Teknologi Rekayasa Otomitif</p>
            <img src={qrCodeImage} alt="Fake QR Code Image" width={72} height={72} className="aspect-square mb-2" />
            <p className="text-sm underline">Yuniarto Agus Winoko, S.T., M.T.</p>
            <p className="text-sm">NIP. 196306011988031004</p>
          </div>
        </div>
      </div>

      {/* Recap Opening Page 2 */}
      <div id="document-2" className="w-[21cm] h-[29.7cm] shadow-md p-[3cm] font-serif bg-white">
        <div className="h-full">
          <RekapHeader />
          <table className="mb-4">
            <tbody>
              <tr>
                <td className="text-sm w-fit">
                  <p className="mr-3">Lampiran ke</p>
                </td>
                <td className="text-sm w-fit">
                  <p className="mr-2">:</p>
                </td>
                <td className="text-sm w-fit">1</td>
              </tr>
            </tbody>
          </table>

          <div className="mb-4">
            <p className="text-sm font-semibold">Judul: </p>
            <p className="text-sm">Rekap Data Mahasiswa, Alat dan Bahan</p>
          </div>

          <p className="text-sm text-zinc-500 mb-1">Tabel Rekap Data Mahasiswa</p>
          <table className="w-full mb-6">
            <thead>
              <tr>
                <th className="w-[5%] p-2 bg-main text-white text-sm border text-center font-semibold leading-none">
                  No
                </th>
                <th className="w-[75%] p-2 bg-main text-white text-sm border text-start font-semibold leading-none">
                  Mahasiswa
                </th>
                <th className="w-[20%] p-2 bg-main text-white text-sm border text-center font-semibold leading-none">
                  Jumlah
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-[5%] p-2 text-black text-sm border text-center leading-none">1</td>
                <td className="w-[75%] p-2 text-black text-sm border text-start leading-none">Mahasiswa Kelas 1</td>
                <td className="w-[20%] p-2 text-black text-sm border text-center leading-none">
                  {mahasiswaKelas1?.total}
                </td>
              </tr>
              <tr>
                <td className="w-[5%] p-2 text-black text-sm border text-center leading-none">2</td>
                <td className="w-[75%] p-2 text-black text-sm border text-start leading-none">Mahasiswa Kelas 2</td>
                <td className="w-[20%] p-2 text-black text-sm border text-center leading-none">
                  {mahasiswaKelas2?.total}
                </td>
              </tr>
              <tr>
                <td className="w-[5%] p-2 text-black text-sm border text-center leading-none">3</td>
                <td className="w-[75%] p-2 text-black text-sm border text-start leading-none">Mahasiswa Kelas 3</td>
                <td className="w-[20%] p-2 text-black text-sm border text-center leading-none">
                  {mahasiswaKelas3?.total}
                </td>
              </tr>
              <tr>
                <td className="w-[5%] p-2 text-black text-sm border text-center leading-none">4</td>
                <td className="w-[75%] p-2 text-black text-sm border text-start leading-none">Mahasiswa Kelas 4</td>
                <td className="w-[20%] p-2 text-black text-sm border text-center leading-none">
                  {mahasiswaKelas4?.total}
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="p-2 text-black text-sm border text-center font-semibold leading-none">
                  Total
                </td>
                <td className="w-[20%] p-2 text-black text-sm border text-center font-semibold leading-none">
                  {mahasiswaKelas1?.total + mahasiswaKelas2?.total + mahasiswaKelas3?.total + mahasiswaKelas4?.total}
                </td>
              </tr>
            </tbody>
          </table>

          <p className="text-sm text-zinc-500 mb-1">Tabel Rekap Data Alat dan Bahan</p>
          <table className="w-full mb-6">
            <thead>
              <tr>
                <th className="w-[5%] p-2 bg-main text-white text-sm border text-center font-semibold leading-none">
                  No
                </th>
                <th className="w-[75%] p-2 bg-main text-white text-sm border text-start font-semibold leading-none">
                  Jenis Barang Praktikum
                </th>
                <th className="w-[20%] p-2 bg-main text-white text-sm border text-center font-semibold leading-none">
                  Jumlah
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-[5%] p-2 text-black text-sm border text-center leading-none">1</td>
                <td className="w-[75%] p-2 text-black text-sm border text-start leading-none">Alat Praktikum</td>
                <td className="w-[20%] p-2 text-black text-sm border text-center leading-none">
                  {dataAlat?.data?.length}
                </td>
              </tr>
              <tr>
                <td className="w-[5%] p-2 text-black text-sm border text-center leading-none">2</td>
                <td className="w-[75%] p-2 text-black text-sm border text-start leading-none">Bahan Praktikum</td>
                <td className="w-[20%] p-2 text-black text-sm border text-center leading-none">
                  {dataBahan?.data?.length}
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="p-2 text-black text-sm border text-center font-semibold leading-none">
                  Total
                </td>
                <td className="w-[20%] p-2 text-black text-sm border text-center font-semibold leading-none">
                  {dataAlat?.data?.length + dataBahan?.data?.length}
                </td>
              </tr>
            </tbody>
          </table>

          <p className="text-sm text-zinc-500 mb-1">Tabel Rekap Data Transaksi</p>
          <table className="w-full mb-6">
            <thead>
              <tr>
                <th className="w-[5%] p-2 bg-main text-white text-sm border text-center font-semibold leading-none">
                  No
                </th>
                <th className="w-[75%] p-2 bg-main text-white text-sm border text-start font-semibold leading-none">
                  Jenis Transaksi
                </th>
                <th className="w-[20%] p-2 bg-main text-white text-sm border text-center font-semibold leading-none">
                  Jumlah
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-[5%] p-2 text-black text-sm border text-center leading-none">1</td>
                <td className="w-[75%] p-2 text-black text-sm border text-start leading-none">Peminjaman</td>
                <td className="w-[20%] p-2 text-black text-sm border text-center leading-none">
                  {dataPeminjaman?.total}
                </td>
              </tr>
              <tr>
                <td className="w-[5%] p-2 text-black text-sm border text-center leading-none">2</td>
                <td className="w-[75%] p-2 text-black text-sm border text-start leading-none">Pengembalian</td>
                <td className="w-[20%] p-2 text-black text-sm border text-center leading-none">
                  {dataPengembalian?.total}
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="p-2 text-black text-sm border text-center font-semibold leading-none">
                  Total
                </td>
                <td className="w-[20%] p-2 text-black text-sm border text-center font-semibold leading-none">
                  {dataPeminjaman?.total + dataPengembalian?.total}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <RekapPeminjaman dataDetailTransaksi={dataDetailTransaksi} />
      <RekapPengembalian dataDetailTransaksi={dataDetailTransaksi} />
    </React.Fragment>
  );
};

export default RekapPage;
