import { InfoOutlined, Refresh, Search } from "@mui/icons-material";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";
import { IconButton, Tooltip } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import AdminDashboardScreenHeader from "./AdminDashboardScreenHeader";
import AdminDashboardScreenUpClass from "./AdminDashboardScreenUpClass";
import {
  peminjamanDataset,
  peminjamanValueFormatter,
  peminjamanChartSetting,
} from "../../../constants/admin-charts-config";
import { useCallback } from "react";

const AdminDashboardScreen = () => {
  const { data: countAllData } = useFetchOnMount({
    url: "/countall",
    method: "GET",
  });

  const { fetchData: reloadCountAllData } = useFetchOnClick();

  const { data: mahasiswaKelas1Data } = useFetchOnMount({
    url: "/user/kelas/1",
    method: "GET",
  });
  const { data: mahasiswaKelas2Data } = useFetchOnMount({
    url: "/user/kelas/2",
    method: "GET",
  });
  const { data: mahasiswaKelas3Data } = useFetchOnMount({
    url: "/user/kelas/3",
    method: "GET",
  });
  const { data: mahasiswaKelas4Data } = useFetchOnMount({
    url: "/user/kelas/4",
    method: "GET",
  });

  const allMahasiswaData = useCallback(() => {
    return [...mahasiswaKelas1Data, ...mahasiswaKelas2Data, ...mahasiswaKelas3Data, ...mahasiswaKelas4Data];
  }, [mahasiswaKelas1Data, mahasiswaKelas2Data, mahasiswaKelas3Data, mahasiswaKelas4Data]);

  return (
    <div className="mb-12">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl font-semibold tracking-wide text-gray-500">Admin Dashboard</h1>
          <button
            onClick={() =>
              reloadCountAllData({
                url: "/countall",
                method: "GET",
              })
            }
            className="bg-blue-400 hover:bg-blue-500 transition-colors duration-150 py-2 px-5 rounded-md text-white text-sm tracking-wide">
            refresh <Refresh fontSize="small" />
          </button>
        </div>
        <AdminDashboardScreenHeader countAllData={countAllData} />
      </div>

      <div className="mb-12">
        <div className="mb-2 flex items-center">
          <h1 className="text-xl font-semibold tracking-wide text-gray-500 mr-2">Grafik Jumlah Transaksi</h1>
          <Tooltip
            placement="bottom-start"
            title="Melalui fitur ini administrator dapat
                  melakukan pengecekan jumlah peminjaman dan pengembalian oleh mahasiswa pada hari ini.">
            <IconButton>
              <InfoOutlined />
            </IconButton>
          </Tooltip>
        </div>

        <div className="grid grid-cols-2">
          <div>
            <BarChart
              dataset={peminjamanDataset}
              yAxis={[{ scaleType: "band", dataKey: "month" }]}
              series={[{ dataKey: "seoul", label: "Jumlah Peminjaman", peminjamanValueFormatter }]}
              layout="horizontal"
              grid={{ vertical: true }}
              {...peminjamanChartSetting}
            />
          </div>
          <div>
            <BarChart
              dataset={peminjamanDataset}
              yAxis={[{ scaleType: "band", dataKey: "month" }]}
              series={[{ dataKey: "seoul", label: "Jumlah Pengembalian", peminjamanValueFormatter }]}
              layout="horizontal"
              grid={{ vertical: true }}
              {...peminjamanChartSetting}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-end mb-3">
          <div className="flex justify-between items-center w-full">
            <div>
              <h1 className="text-xl font-semibold tracking-wide text-gray-500">Manajemen Kenaikan Kelas</h1>
              <h1 className="text-xl font-semibold tracking-wide text-gray-500">
                Mahasiswa Teknologi Rekayasa Otomotif
              </h1>
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
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-2 text-blue-700">
              <Search />
            </button>
          </div>
        </div>

        <AdminDashboardScreenUpClass allMahasiswaData={allMahasiswaData} />
      </div>
    </div>
  );
};

export default AdminDashboardScreen;
