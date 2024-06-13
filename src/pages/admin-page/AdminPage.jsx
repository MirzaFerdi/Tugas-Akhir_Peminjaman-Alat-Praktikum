import React, { useEffect } from "react";
import AdminSidebar from "../../components/AdminComponents/AdminSidebar/AdminSidebar";
import AppLogoBar from "../../components/AppLogoBar/AppLogoBar";
import { AdminNavbar, Notification, AdminPageContents, AdminMahasiswaFotoPreviewDialog, AlertComponent } from "../../components";
import { useAdminPageId } from "../../hooks/usePage";
import { useSidebar } from "../../hooks/useSidebar";

const AdminPage = () => {
  const { userId } = JSON.parse(localStorage.getItem("user_payloads"));

  const { adminPageId, handleChangeAdminPageId } = useAdminPageId();
  const { isSidebarDrawerOpen, openSidebar, closeSidebar } = useSidebar();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "b") {
        isSidebarDrawerOpen ? closeSidebar() : openSidebar();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeSidebar, isSidebarDrawerOpen, openSidebar]);

  useEffect(() => {
    const sidebarOpen = JSON.parse(localStorage.getItem("is_sidebar_open"));
    const lastVisitedAdminPageId = JSON.parse(localStorage.getItem("last_visited_admin_page_id"));

    if (
      (lastVisitedAdminPageId != undefined && lastVisitedAdminPageId != null) ||
      (sidebarOpen != undefined && sidebarOpen != null)
    ) {
      handleChangeAdminPageId(lastVisitedAdminPageId);
      sidebarOpen ? () => openSidebar() : closeSidebar();
    } else {
      localStorage.setItem("last_visited_admin_page_id", JSON.stringify(adminPageId));
    }
  }, [adminPageId, closeSidebar, handleChangeAdminPageId, isSidebarDrawerOpen, openSidebar]);

  return (
    <React.Fragment>
      <Notification roleId={1} userId={userId} />
      <AlertComponent />
      <AdminMahasiswaFotoPreviewDialog />
      <div className="grid grid-cols-5">
        {isSidebarDrawerOpen && (
          <div className="col-span-5 lg:col-span-1 grid grid-rows-12 h-screen">
            <div className="row-span-1">
              <AppLogoBar />
            </div>
            <div className="row-span-11">
              <AdminSidebar />
            </div>
          </div>
        )}
        <div
          className={`${isSidebarDrawerOpen ? "col-span-4 hidden lg:grid" : "col-span-5 grid"} grid-rows-12 h-screen`}>
          <div className="row-span-1">
            <AdminNavbar />
          </div>
          <div className="row-span-11 p-4 overflow-y-auto">
            <AdminPageContents />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminPage;
