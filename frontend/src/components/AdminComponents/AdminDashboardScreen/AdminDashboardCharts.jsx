import PropTypes from "prop-types";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const AdminDashboardCharts = ({ sortChartDataBy }) => {
  const dayData = [
    {
      name: "Senin",
      transaksi: 33,
    },
    {
      name: "Selasa",
      transaksi: 58,
    },
    {
      name: "Rabu",
      transaksi: 46,
    },
    {
      name: "Kamis",
      transaksi: 52,
    },
    {
      name: "Jum'at",
      transaksi: 16,
    },
  ];

  const monthData = [
    {
      name: "Jan",
      transaksi: 33,
    },
    {
      name: "Feb",
      transaksi: 58,
    },
    {
      name: "Mar",
      transaksi: 46,
    },
    {
      name: "Apr",
      transaksi: 52,
    },
    {
      name: "Mei",
      transaksi: 12,
    },
    {
      name: "Jun",
      transaksi: 32,
    },
    {
      name: "Jul",
      transaksi: 26,
    },
    {
      name: "Aug",
      transaksi: 33,
    },
    {
      name: "Sept",
      transaksi: 19,
    },
    {
      name: "Okt",
      transaksi: 22,
    },
    {
      name: "Nov",
      transaksi: 19,
    },
    {
      name: "Des",
      transaksi: 34,
    },
  ];

  return (
    <ResponsiveContainer maxWidth={900} maxHeight={300} width="100%" height="100%" className="p-2">
      <LineChart width={800} height={300} data={sortChartDataBy === "hari" ? dayData : monthData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          tickCount={sortChartDataBy === "hari" ? 5 : 12}
          label={sortChartDataBy === "hari" ? "Hari" : "Bulan"}
          dataKey="name"
          className="text-[0.65em]"
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="transaksi" stroke="#1D0C5A" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

AdminDashboardCharts.propTypes = {
  sortChartDataBy: PropTypes.any,
};

export default AdminDashboardCharts;
