import React, { useState } from "react";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";
import { recapIcon } from "../../../assets";
import { RemoveRedEye } from "@mui/icons-material";

const AdminRekapScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    { id: 1, namaBulan: "Januari" },
    { id: 2, namaBulan: "Februari" },
    { id: 3, namaBulan: "Maret" },
    { id: 4, namaBulan: "April" },
    { id: 5, namaBulan: "Mei" },
    { id: 6, namaBulan: "Juni" },
    { id: 7, namaBulan: "Juli" },
    { id: 8, namaBulan: "Agustus" },
    { id: 9, namaBulan: "September" },
    { id: 10, namaBulan: "Oktober" },
    { id: 11, namaBulan: "November" },
    { id: 12, namaBulan: "Desember" },
  ];
  const year = new Date().getFullYear();

  const { data: rekapDataBulanan } = useFetchOnMount({
    url: `/peminjaman/transaksi/bulanan/${selectedMonth}/${selectedYear}`,
    method: "GET",
  });  

  return (
    <React.Fragment>
      <div className="flex justify-between items-center px-4 lg:px-8 py-2 lg:py-4 bg-main shadow-sm shadow-main mx-6 lg:mx-8 rounded-xl text-white -mb-5 lg:-mb-10 relative">
        <h1 className="text-sm lg:text-2xl tracking-wide font-bold leading-none mr-4">Rekap Data Bulanan</h1>
      </div>
      <div className="pb-5 pt-10 lg:pt-20 bg-white px-8 rounded-md shadow-md mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start mb-8">
          <div className="flex flex-col lg:items-start mb-3 lg:mb-0">
            <p className="text-md tracking-wide text-center lg:text-start">Rekap Data Bulanan Transaksi</p>
            <p className="text-sm tracking-wide text-zinc-500 text-center lg:text-start">Teknologi Rekayasa Otomotif</p>
          </div>
          <div className="flex justify-end relative gap-3">
            <select
              onChange={(event) => {
                setSelectedMonth(event.target.value);
              }}
              className="cursor-pointer bg-white shadow-md text-sm leading-none rounded-lg block w-full p-3">
              {months.map((month) => {
                const { id, namaBulan } = month;

                return (
                  <option key={id} value={id} selected={id === new Date().getMonth() + 1}>
                    {namaBulan}
                  </option>
                );
              })}
            </select>
            <select
              onChange={(event) => {
                setSelectedYear(event.target.value);
              }}
              className="cursor-pointer bg-white shadow-md text-sm leading-none rounded-lg block w-full p-3">
              <option value="" selected>
                Pilih Tahun
              </option>
              <option value={year} selected>
                {year}
              </option>
            </select>
          </div>
        </div>
      </div>
      <table className="mb-3 w-full">
        <thead>
          <tr>
            <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[70%]">
              Data
            </th>
            <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[10%]">
              Bulan
            </th>
            <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[10%]">
              Tahun
            </th>
            <th
              colSpan={2}
              className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-center font-medium text-zinc-400 w-[10%]">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {rekapDataBulanan?.success === true ? (
            <tr>
              <td className="border-b border-zinc-300 p-2">
                <div className="w-full flex justify-start items-center">
                  <img src={recapIcon} alt="Monthly Recap Icon" width={40} height={40} className="aspect-square mr-5" />
                  <div>
                    <p className="text-sm font-semibold">Laporan Rekap Bulanan</p>
                    <p className="text-xs tracking-wide text-zinc-400">Peminjaman & Pengembalian</p>
                  </div>
                </div>
              </td>
              <td className="text-start border-b border-zinc-300 text-xs p-2 w-fit">{selectedMonth}</td>
              <td className="text-start border-b border-zinc-300 text-xs p-2 w-fit">{selectedYear}</td>
              <td className="text-start border-b border-zinc-300 text-xs p-2 w-fit">
                <a
                  href={`/admin/rekap/${selectedMonth}/${selectedYear}`}
                  className="text-xs w-full flex justify-center items-center py-2 px-5 bg-main hover:bg-main-hover
                  transition-colors duration-150 rounded-full text-white">
                  <RemoveRedEye sx={{ fontSize: "1.4em" }} className="mr-3" /> <p className="leading-none">Preview</p>
                </a>
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan={7} className="p-2 border text-xs text-center">
                {rekapDataBulanan?.message}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default AdminRekapScreen;
