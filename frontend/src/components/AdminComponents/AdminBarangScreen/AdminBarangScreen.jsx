import React, { useEffect, useState } from "react";
import { adminBarangContents } from "../../../constants/admin-barang-contents";
import AdminAlatScreen from "./AdminAlatScreen";
import AdminBahanScreen from "./AdminBahanScreen";

const AdminBarangScreen = () => {
  const [adminBarangPageId, setAdminBarangPageId] = useState(1);

  const handleChangeAdminBarangPageId = (id) => {
    setAdminBarangPageId(id);
    localStorage.setItem("last_visited_admin_barang_page_id", JSON.stringify(id));
  };

  useEffect(() => {
    const lastVisitedAdminBarangPageId = JSON.parse(localStorage.getItem("last_visited_admin_barang_page_id"));

    if (lastVisitedAdminBarangPageId != undefined && lastVisitedAdminBarangPageId != null) {
      setAdminBarangPageId(lastVisitedAdminBarangPageId);
    } else {
      localStorage.setItem("last_visited_admin_barang_page_id", JSON.stringify(adminBarangPageId));
    }
  }, [adminBarangPageId]);

  const BarangPageContent = () => {
    switch (adminBarangPageId) {
      case 1:
        return <AdminAlatScreen />;
      case 2:
        return <AdminBahanScreen />;
      default:
        return <AdminBahanScreen />;
    }
  };

  return (
    <React.Fragment>
      <div className="col-span-1 flex justify-between gap-5 mb-8 px-3 py-2 bg-white rounded-sm shadow-md">
        {adminBarangContents.map((buttons) => {
          const { id, buttonText } = buttons;

          return (
            <button
              key={id}
              onClick={() => handleChangeAdminBarangPageId(id)}
              className={`${
                adminBarangPageId == id
                  ? "text-white bg-blue-400"
                  : "text-zinc-400 hover:bg-blue-400 hover:text-white bg-white"
              }  text-xs tracking-wider w-full bg-blue-white border-2 border-blue-400 transition-all rounded-full duration-200 py-2 px-5`}>
              {buttonText}
            </button>
          );
        })}
      </div>

      <BarangPageContent />
    </React.Fragment>
  );
};

export default AdminBarangScreen;
