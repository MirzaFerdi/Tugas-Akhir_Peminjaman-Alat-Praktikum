import { useState } from "react";
import { getMonth, getYear } from "../../../utils/datetime";
import AdminRekapScreenDocument from "./AdminRekapScreenDocument";
import AdminRekapScreenTransaksi from "./AdminRekapScreenTransaksi";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";

const AdminRekapScreen = () => {
  const { allMonth, currentMonth } = getMonth(new Date().getMonth());
  const { allYear, currentYear } = getYear(new Date().getFullYear());

  const [selectedMonth, setSelectedMonth] = useState(currentMonth.monthName);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleDownload = () => {
    const document1 = document.getElementById("document1");
    const document2 = document.getElementById("document2");
    const width = 21; // Ukuran A4 dalam cm
    const height = 29.7; // Ukuran A4 dalam cm

    Promise.all([htmlToImage.toPng(document1), htmlToImage.toPng(document2)])
      .then(([image1, image2]) => {
        const pdf = new jsPDF("p", "cm", [width, height]);
        pdf.addImage(image1, "PNG", 0, 0, width, height, "", "BEST");
        pdf.addPage();
        pdf.addImage(image2, "PNG", 0, 0, width, height, "", "BEST");
        pdf.save("download.pdf");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="overflow-x-auto">
      <div className="block lg:grid grid-cols-3 items-end mb-8">
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

      <div className="flex justify-end mb-4">
        <button
          onClick={() => handleDownload()}
          className="py-2 px-5 text-xs text-white rounded-md bg-blue-400 hover:bg-blue-500 transition-colors duration-150">
          Download Rekap Bulan {selectedMonth} Tahun {selectedYear}
        </button>
      </div>

      <div className="flex flex-col items-center">
        <AdminRekapScreenDocument selectedMonth={selectedMonth} selectedYear={selectedYear} />
        <AdminRekapScreenTransaksi selectedMonth={selectedMonth} selectedYear={selectedYear} />
      </div>
    </div>
  );
};

export default AdminRekapScreen;
