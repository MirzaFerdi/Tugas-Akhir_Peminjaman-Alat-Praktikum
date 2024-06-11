import { useState } from "react";
import { InfoOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import AdminDashboardScreenHeader from "./AdminDashboardScreenHeader";
import AdminDashboardCharts from "./AdminDashboardCharts";
import AdminDashboardCharts2 from "./AdminDashboardCharts2";

const AdminDashboardScreen = () => {
  const [sortChartDataBy, setSortChartDataBy] = useState("hari");

  return (
    <div className="mb-20">
      <div className="mb-5">
        <AdminDashboardScreenHeader />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-8">
        <div className="col-span-1 lg:col-span-3 p-3 bg-white rounded-md shadow-md">
          <div className="grid grid-cols-2 items-center mb-5">
            <div className="w-full flex items-center justify-center">
              <h1 className="text-sm text-gray-500 mr-2">Grafik Jumlah Transaksi</h1>
              <Tooltip
                placement="bottom-start"
                title="Melalui fitur ini administrator dapat melakukan pengecekan jumlah peminjaman dan pengembalian oleh mahasiswa pada hari ini.">
                <IconButton>
                  <InfoOutlined />
                </IconButton>
              </Tooltip>
            </div>
            <div className="flex justify-end">
              <select
                className="p-2 border-2 hover:border-zinc-300 w-1/2 text-xs cursor-pointer focus:outline-none"
                value={sortChartDataBy}
                onChange={(event) => setSortChartDataBy(event.target.value)}>
                <option value="hari">Hari</option>
                <option value="bulan">Bulan</option>
              </select>
            </div>
          </div>

          {/* <AdminDashboardCharts sortChartDataBy={sortChartDataBy} /> */}
        </div>
        <div className="col-span-1 lg:col-span-2 p-3 bg-white rounded-md shadow-md">
          <div className="mb-5">
            <div className="pl-6 w-full flex items-center justify-start">
              <h1 className="text-sm text-gray-500 mr-2">Grafik Perbandingan Mahasiswa</h1>
              <Tooltip
                placement="bottom-start"
                title="Melalui fitur ini administrator dapat melakukan pengecekan jumlah peminjaman dan pengembalian oleh mahasiswa pada hari ini.">
                <IconButton>
                  <InfoOutlined />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          {/* <AdminDashboardCharts2 sortChartDataBy={sortChartDataBy} /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardScreen;
