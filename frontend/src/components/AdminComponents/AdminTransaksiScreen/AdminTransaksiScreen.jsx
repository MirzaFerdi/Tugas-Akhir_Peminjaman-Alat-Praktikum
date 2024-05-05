import React, { useEffect, useState } from "react";
import PeminjamanScreen from "./PeminjamanScreen";
import PengembalianScreen from "./PengembalianScreen";
import { adminTransaksiContents } from "../../../constants/admin-transaksi-contents";

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
        {adminTransaksiContents.map((buttons) => {
          const { id, buttonText } = buttons;

          return (
            <button
              key={id}
              onClick={() => handleChangeAdminTransaksiPageId(id)}
              className={`${
                adminTransaksiPageId == id
                  ? "text-white bg-blue-400"
                  : "text-zinc-400 hover:bg-blue-400 hover:text-white bg-white"
              }  text-xs tracking-wider w-full bg-blue-white border-2 border-blue-400 transition-all rounded-full duration-200 py-2 px-5`}>
              {buttonText}
            </button>
          );
        })}
      </div>

      <TransaksiPageContent />
    </React.Fragment>
  );
};

export default AdminTransaksiScreen;
