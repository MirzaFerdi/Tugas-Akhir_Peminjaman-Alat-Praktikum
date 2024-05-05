import React, { useState } from "react";
import { getMonth, getYear } from "../../../utils/datetime";
import AdminRekapScreenDocument from "./AdminRekapScreenDocument";
import AdminRekapScreenTransaksi from "./AdminRekapScreenTransaksi";

const AdminRekapScreen = () => {
  const { allMonth, currentMonth } = getMonth(new Date().getMonth());
  const { allYear, currentYear } = getYear(new Date().getFullYear());

  const [selectedMonth, setSelectedMonth] = useState(currentMonth.monthName);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  return (
    <React.Fragment>
      <div className="grid grid-cols-3 items-end mb-8">
        <div className="col-span-2">
          <h1 className="text-lg tracking-wider font-semibold">Rekap Data Bulanan</h1>
          <h2 className="text-md tracking-wide text-zinc-500">Transaksi Peminjaman dan Pengembalian</h2>
        </div>
        <div className="grid grid-cols-2 gap-5 items-center">
          <select
            defaultValue={selectedYear}
            onChange={(event) => {
              setSelectedYear(event.target.value);
            }}
            className="w-full p-2 cursor-pointer bg-white hover:bg-blue-50 focus:outline-none shadow-md rounded-sm">
            {allYear.map((years) => {
              const { id, year } = years;

              return (
                <option key={id} value={year} className="text-md tracking-wide" defaultValue={currentYear}>
                  {year}
                </option>
              );
            })}
          </select>
          <select
            defaultValue={selectedMonth}
            onChange={(event) => {
              setSelectedMonth(event.target.value);
            }}
            className="w-full p-2 cursor-pointer bg-white hover:bg-blue-50 focus:outline-none shadow-md rounded-sm">
            {allMonth.map((months) => {
              const { id, monthName } = months;

              return (
                <option key={id} value={monthName} className="text-md tracking-wide">
                  {monthName}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <AdminRekapScreenDocument selectedMonth={selectedMonth} selectedYear={selectedYear} />
      <AdminRekapScreenTransaksi selectedMonth={selectedMonth} selectedYear={selectedYear} />
    </React.Fragment>
  );
};

export default AdminRekapScreen;
