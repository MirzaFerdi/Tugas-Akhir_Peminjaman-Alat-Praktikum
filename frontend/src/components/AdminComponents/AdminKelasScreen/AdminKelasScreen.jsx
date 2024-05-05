import React, { useEffect, useState } from "react";
import { adminKelasContents } from "../../../constants/admin-kelas-contents";
import Kelas1 from "./Kelas1";
import Kelas2 from "./Kelas2";
import Kelas3 from "./Kelas3";
import Kelas4 from "./Kelas4";

const AdminKelasScreen = () => {
  const [adminKelasPageId, setAdminKelasPageId] = useState(1);

  const handleChangeAdminKelasPageId = (id) => {
    setAdminKelasPageId(id);
    localStorage.setItem("last_visited_admin_kelas_page_id", JSON.stringify(id));
  };

  useEffect(() => {
    const lastVisitedAdminKelasPageId = JSON.parse(localStorage.getItem("last_visited_admin_kelas_page_id"));

    if (lastVisitedAdminKelasPageId != undefined && lastVisitedAdminKelasPageId != null) {
      setAdminKelasPageId(lastVisitedAdminKelasPageId);
    } else {
      localStorage.setItem("last_visited_admin_kelas_page_id", JSON.stringify(adminKelasPageId));
    }
  }, [adminKelasPageId]);

  const KelasPageContent = () => {
    switch (adminKelasPageId) {
      case 1:
        return <Kelas1 />;
      case 2:
        return <Kelas2 />;
      case 3:
        return <Kelas3 />;
      case 4:
        return <Kelas4 />;
      default:
        return <Kelas1 />;
    }
  };

  return (
    <React.Fragment>
      <div className="col-span-1 flex justify-between gap-5 mb-8 px-3 py-2 bg-white rounded-sm shadow-md">
        {adminKelasContents.map((buttons) => {
          const { id, buttonText } = buttons;

          return (
            <button
              key={id}
              onClick={() => handleChangeAdminKelasPageId(id)}
              className={`${
                adminKelasPageId == id
                  ? "text-white bg-blue-400"
                  : "text-zinc-400 hover:bg-blue-400 hover:text-white bg-white"
              }  text-xs tracking-wider w-full bg-blue-white border-2 border-blue-400 transition-all rounded-full duration-200 py-2 px-5`}>
              {buttonText}
            </button>
          );
        })}
      </div>

      <KelasPageContent />
    </React.Fragment>
  );
};

export default AdminKelasScreen;
