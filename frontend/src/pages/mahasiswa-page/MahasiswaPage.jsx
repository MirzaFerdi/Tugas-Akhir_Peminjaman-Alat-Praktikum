import React, { useEffect } from "react";
import { MahasiswaPageContents, AppLogoBar, MahasiswaNavbar, MahasiswaSidebar, Notification, AlertComponent } from "../../components";
import { useMahasiswaPageId } from "../../hooks/usePage";
import { useSidebar } from "../../hooks/useSidebar";

const MahasiswaPage = () => {  
  const { userId } = JSON.parse(localStorage.getItem("user_payloads"));

  const { mahasiswaPageId, handleChangeMahasiswaPageId } = useMahasiswaPageId();
  const { isSidebarDrawerOpen, openSidebar, closeSidebar } = useSidebar();

  useEffect(() => {
    const lastVisitedMahasiswaPageId = JSON.parse(localStorage.getItem("last_visited_mahasiswa_page_id"));
    const sidebarOpen = JSON.parse(localStorage.getItem("is_sidebar_open"));

    if (
      (lastVisitedMahasiswaPageId != undefined && lastVisitedMahasiswaPageId != null) ||
      (sidebarOpen != undefined && sidebarOpen != null)
    ) {
      handleChangeMahasiswaPageId(lastVisitedMahasiswaPageId);
      sidebarOpen ? () => openSidebar() : closeSidebar();
    } else {
      localStorage.setItem("last_visited_mahasiswa_page_id", JSON.stringify(mahasiswaPageId));
    }
  }, [closeSidebar, handleChangeMahasiswaPageId, mahasiswaPageId, openSidebar]);

  return (
    <React.Fragment>
      <Notification roleId={2} userId={userId} />
      <AlertComponent />
      <div className="grid grid-cols-5">
        <div className={`${isSidebarDrawerOpen ? "col-span-5 lg:col-span-1" : "hidden"} grid grid-rows-12 h-screen`}>
          <div className="row-span-1">
            <AppLogoBar />
          </div>
          <div className="row-span-11">
            <MahasiswaSidebar />
          </div>
        </div>
        <div
          className={`${
            isSidebarDrawerOpen
              ? "col-span-4 hidden lg:grid grid-rows-12 h-screen"
              : "col-span-5 grid grid-rows-12 h-screen"
          }`}>
          <div className="row-span-1">
            <MahasiswaNavbar />
          </div>
          <div className="row-span-11 p-4 overflow-y-auto">
            <MahasiswaPageContents />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MahasiswaPage;
