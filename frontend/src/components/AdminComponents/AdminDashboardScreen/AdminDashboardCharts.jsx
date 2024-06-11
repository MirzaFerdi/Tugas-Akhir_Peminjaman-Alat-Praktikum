import PropTypes from "prop-types";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";

const AdminDashboardCharts = ({ sortChartDataBy }) => {
  const getWeekNumber = (date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - startOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  };

  // Fungsi untuk mendapatkan tanggal awal minggu tertentu dalam tahun
  const getStartOfWeek = (year, week) => {
    const startOfYear = new Date(year, 0, 1);
    const startWeekDay = startOfYear.getDay() === 0 ? 7 : startOfYear.getDay();
    const startOfWeek = new Date(year, 0, 1 + (week - 1) * 7 - startWeekDay + 1);
    return startOfWeek;
  };

  // Fungsi untuk mendapatkan semua tanggal dalam minggu tersebut
  const getDatesOfWeek = (startOfWeek) => {
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(formatDate(date));
    }
    return dates;
  };

  // Fungsi untuk memformat tanggal menjadi DD-MM-YYYY
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const date = new Date();
  const weekOfYear = getWeekNumber(date);
  const startOfWeek = getStartOfWeek(date.getFullYear(), weekOfYear);
  const datesOfWeek = getDatesOfWeek(startOfWeek);

  const { data: transaksiSenin } = useFetchOnMount({
    url: `/peminjaman/transaksi/harian/${datesOfWeek[0]}`,
    method: "GET",
  });
  const { data: transaksiSelasa } = useFetchOnMount({
    url: `/peminjaman/transaksi/harian/${datesOfWeek[1]}`,
    method: "GET",
  });
  const { data: transaksiRabu } = useFetchOnMount({
    url: `/peminjaman/transaksi/harian/${datesOfWeek[2]}`,
    method: "GET",
  });
  const { data: transaksiKamis } = useFetchOnMount({
    url: `/peminjaman/transaksi/harian/${datesOfWeek[3]}`,
    method: "GET",
  });
  const { data: transaksiJumat } = useFetchOnMount({
    url: `/peminjaman/transaksi/harian/${datesOfWeek[4]}`,
    method: "GET",
  });

  const dayData = [
    {
      name: `Senin, ${datesOfWeek[0]}`,
      transaksi: transaksiSenin?.peminjaman?.length + transaksiSenin?.pengembalian?.length || 0,
    },
    {
      name: `Selasa, ${datesOfWeek[1]}`,
      transaksi: transaksiSelasa?.peminjaman?.length + transaksiSelasa?.pengembalian?.length || 0,
    },
    {
      name: `Rabu, ${datesOfWeek[2]}`,
      transaksi: transaksiRabu?.peminjaman?.length + transaksiRabu?.pengembalian?.length || 0,
    },
    {
      name: `Kamis, ${datesOfWeek[3]}`,
      transaksi: transaksiKamis?.peminjaman?.length + transaksiKamis?.pengembalian?.length || 0,
    },
    {
      name: `Jum'at, ${datesOfWeek[4]}`,
      transaksi: transaksiJumat?.peminjaman?.length + transaksiJumat?.pengembalian?.length || 0,
    },
  ];

  const { data: rekapDataJanuari } = useFetchOnMount({
    url: `/peminjaman/transaksi/bulanan/${1}/2024`,
    method: "GET",
  });
  const { data: rekapDataFebruari } = useFetchOnMount({
    url: `/peminjaman/transaksi/bulanan/${2}/2024`,
    method: "GET",
  });
  const { data: rekapDataMaret } = useFetchOnMount({
    url: `/peminjaman/transaksi/bulanan/${3}/2024`,
    method: "GET",
  });
  const { data: rekapDataApril } = useFetchOnMount({
    url: `/peminjaman/transaksi/bulanan/${4}/2024`,
    method: "GET",
  });
  const { data: rekapDataMei } = useFetchOnMount({
    url: `/peminjaman/transaksi/bulanan/${5}/2024`,
    method: "GET",
  });
  const { data: rekapDataJuni } = useFetchOnMount({
    url: `/peminjaman/transaksi/bulanan/${6}/2024`,
    method: "GET",
  });
  const { data: rekapDataJuli } = useFetchOnMount({
    url: `/peminjaman/transaksi/bulanan/${7}/2024`,
    method: "GET",
  });
  const { data: rekapDataAgustus } = useFetchOnMount({
    url: `/peminjaman/transaksi/bulanan/${8}/2024`,
    method: "GET",
  });
  const { data: rekapDataSeptember } = useFetchOnMount({
    url: `/peminjaman/transaksi/bulanan/${9}/2024`,
    method: "GET",
  });
  const { data: rekapDataOktober } = useFetchOnMount({
    url: `/peminjaman/transaksi/bulanan/${10}/2024`,
    method: "GET",
  });
  const { data: rekapDataNovember } = useFetchOnMount({
    url: `/peminjaman/transaksi/bulanan/${11}/2024`,
    method: "GET",
  });
  const { data: rekapDataDesember } = useFetchOnMount({
    url: `/peminjaman/transaksi/bulanan/${12}/2024`,
    method: "GET",
  });

  const monthData = [
    {
      name: "Jan",
      transaksi: rekapDataJanuari?.peminjaman?.length + rekapDataJanuari?.pengembalian?.length || 0,
    },
    {
      name: "Feb",
      transaksi: rekapDataFebruari?.peminjaman?.length + rekapDataFebruari?.pengembalian?.length || 0,
    },
    {
      name: "Mar",
      transaksi: rekapDataMaret?.peminjaman?.length + rekapDataMaret?.pengembalian?.length || 0,
    },
    {
      name: "Apr",
      transaksi: rekapDataApril?.peminjaman?.length + rekapDataApril?.pengembalian?.length || 0,
    },
    {
      name: "Mei",
      transaksi: rekapDataMei?.peminjaman?.length + rekapDataMei?.pengembalian?.length,
    },
    {
      name: "Jun",
      transaksi: rekapDataJuni?.peminjaman?.length + rekapDataJuni?.pengembalian?.length || 0,
    },
    {
      name: "Jul",
      transaksi: rekapDataJuli?.peminjaman?.length + rekapDataJuli?.pengembalian?.length || 0,
    },
    {
      name: "Aug",
      transaksi: rekapDataAgustus?.peminjaman?.length + rekapDataAgustus?.pengembalian?.length || 0,
    },
    {
      name: "Sept",
      transaksi: rekapDataSeptember?.peminjaman?.length + rekapDataSeptember?.pengembalian?.length || 0,
    },
    {
      name: "Okt",
      transaksi: rekapDataOktober?.peminjaman?.length + rekapDataOktober?.pengembalian?.length || 0,
    },
    {
      name: "Nov",
      transaksi: rekapDataNovember?.peminjaman?.length + rekapDataNovember?.pengembalian?.length || 0,
    },
    {
      name: "Des",
      transaksi: rekapDataDesember?.peminjaman?.length + rekapDataDesember?.pengembalian?.length || 0,
    },
  ];

  return (
    <ResponsiveContainer maxWidth={900} maxHeight={300} width="100%" height="100%" className="p-2">
      <LineChart width={800} height={300} data={sortChartDataBy === "hari" ? dayData : monthData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis tickCount={sortChartDataBy === "hari" ? 5 : 12} dataKey="name" className="text-[0.65em]" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="transaksi" stroke="#1D0C5A" activeDot={{ r: 8 }} />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

AdminDashboardCharts.propTypes = {
  sortChartDataBy: PropTypes.any,
};

export default AdminDashboardCharts;
