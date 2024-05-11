import { InfoOutlined, Search } from "@mui/icons-material";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import AdminDashboardScreenHeader from "./AdminDashboardScreenHeader";
import AdminDashboardScreenUpClass from "./AdminDashboardScreenUpClass";
import AdminDashboardCharts from "./AdminDashboardCharts";
import AdminDashboardCharts2 from "./AdminDashboardCharts2";

const AdminDashboardScreen = () => {
  const [allMahasiswaKeywords, setAllMahasiswaKeywords] = useState("");
  const [sortChartDataBy, setSortChartDataBy] = useState("hari");

  const { data: countAllData } = useFetchOnMount({
    url: "/countall",
    method: "GET",
  });

  return (
    <div className="mb-20">
      <div className="mb-5">
        <AdminDashboardScreenHeader countAllData={countAllData} />
      </div>

      <div className="grid grid-cols-5 gap-5 mb-8">
        <div className="col-span-3 p-3 bg-white rounded-md shadow-md">
          <div className="grid grid-cols-2 items-center mb-5">
            <div className="w-full flex items-center justify-center">
              <h1 className="text-sm text-gray-500 mr-2">Grafik Jumlah Transaksi</h1>
              <Tooltip
                placement="bottom-start"
                title="Melalui fitur ini administrator dapat
                  melakukan pengecekan jumlah peminjaman dan pengembalian oleh mahasiswa pada hari ini.">
                <IconButton>
                  <InfoOutlined />
                </IconButton>
              </Tooltip>
            </div>
            <div className="flex justify-end">
              <select
                className="p-2 border-2 hover:border-zinc-300 w-1/2 text-xs cursor-pointer focus:outline-none"
                onChange={(event) => {
                  setSortChartDataBy(event.target.value);
                }}>
                <option value="" disabled>
                  Pilih Sortir Data
                </option>
                <option value="hari">Hari</option>
                <option value="bulan">Bulan</option>
              </select>
            </div>
          </div>
          <AdminDashboardCharts sortChartDataBy={sortChartDataBy} />
        </div>
        <div className="col-span-2 p-3 bg-white rounded-md shadow-md">
          <div className="mb-5">
            <div className="pl-6 w-full flex items-center justify-start">
              <h1 className="text-sm text-gray-500 mr-2">Grafik Perbandingan Mahasiswa</h1>
              <Tooltip
                placement="bottom-start"
                title="Melalui fitur ini administrator dapat
                  melakukan pengecekan jumlah peminjaman dan pengembalian oleh mahasiswa pada hari ini.">
                <IconButton>
                  <InfoOutlined />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <AdminDashboardCharts2 sortChartDataBy={sortChartDataBy} />
        </div>
      </div>

      <div>
        <div className="flex flex-col lg:flex-row justify-between items-end mb-8 lg:mb-3">
          <div className="flex justify-between items-center w-full mb-3 lg:mb-0">
            <div>
              <h1 className="text-lg font-semibold tracking-wide text-gray-500">Manajemen Kenaikan Kelas</h1>
            </div>
            <Tooltip
              placement="bottom-start"
              title="Melalui fitur ini administrator dapat
                  memperbarui status kelas mahasiswa, baik dari kelas 1 ke kelas 2, kelas 2 ke kelas 3, kelas 3 ke
                  kelas 4 dan memberikan status alumni pada mahasiswa kelas 4 sebelumnya, sehingga mahasiswa status alumni tidak
                  dapat melakukan login ke dalam sistem.">
              <IconButton>
                <InfoOutlined />
              </IconButton>
            </Tooltip>
          </div>
          <div className="flex justify-center lg:justify-end relative w-full">
            <input
              type="text"
              autoComplete="off"
              className="p-2 text-xs border-2 border-blue-300 rounded-sm w-full lg:w-1/2 leading-none tracking-wide hover:border-blue-400 focus:outline-none focus:border-blue-400"
              name="keywords"
              placeholder="cari mahasiswa ..."
              onChange={(event) => {
                setAllMahasiswaKeywords(event.target.value);
              }}
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-2 text-blue-700">
              <Search />
            </button>
          </div>
        </div>

        <AdminDashboardScreenUpClass allMahasiswaKeywords={allMahasiswaKeywords} />
      </div>
    </div>
  );
};

export default AdminDashboardScreen;
