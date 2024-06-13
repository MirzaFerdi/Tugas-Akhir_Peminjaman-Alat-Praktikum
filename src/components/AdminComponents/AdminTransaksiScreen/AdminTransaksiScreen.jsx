import React, { useEffect, useState } from "react";
import PeminjamanScreen from "./PeminjamanScreen";
import PengembalianScreen from "./PengembalianScreen";

const AdminTransaksiScreen = () => {
  const [adminTransaksiPageId, setAdminTransaksiPageId] = useState(1);

  const handleChangeAdminTransaksiPageId = (id) => {
    setAdminTransaksiPageId(id);
    localStorage.setItem("last_visited_admin_transaksi_page_id", JSON.stringify(id));
  };

  useEffect(() => {
    const lastVisitedAdminTransaksiPageId = JSON.parse(localStorage.getItem("last_visited_admin_transaksi_page_id"));

    if (lastVisitedAdminTransaksiPageId != undefined && lastVisitedAdminTransaksiPageId != null) {
      setAdminTransaksiPageId(lastVisitedAdminTransaksiPageId);
    } else {
      localStorage.setItem("last_visited_admin_transaksi_page_id", JSON.stringify(adminTransaksiPageId));
    }
  }, [adminTransaksiPageId]);

  const TransaksiPageContent = () => {
    switch (adminTransaksiPageId) {
      case 1:
        return <PeminjamanScreen />;
      case 2:
        return <PengembalianScreen />;
      default:
        return <PeminjamanScreen />;
    }
  };

  return (
    <React.Fragment>
      <div className="col-span-1 flex justify-between gap-5 mb-8 px-3 py-2 bg-white rounded-sm shadow-md">
        <thead>
          <tr>
            <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[43%]">
              Data Mahasiswa
            </th>
            <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[15%]">
              Data Barang
            </th>
            <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[15%]">
              Jumlah Pengembalian
            </th>
            <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[15%]">
              Jumlah Habis / Rusak
            </th>
            <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[12%]">
              Jumlah Kembali
            </th>
          </tr>
        </thead>
      </div>

      <TransaksiPageContent />
    </React.Fragment>
  );
};

export default AdminTransaksiScreen;
