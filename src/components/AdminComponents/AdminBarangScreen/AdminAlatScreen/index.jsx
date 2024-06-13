import { useState } from "react";
import { AddCircleOutline } from "@mui/icons-material";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";
import { useAdminAddBarangDialog } from "../../../../hooks/useDialog";
import { Pagination } from "@mui/material";
import AlatPraktikumTableData from "./AlatPraktikumTableData";
import AdminAddBarangDialog from "../AdminAddBarangDialog";
import AdminBarangInformation from "../AdminBarangInformation";
import AdminEditBarangDialog from "../AdminEditBarangDialog";

const AdminAlatScreen = () => {  
  const [paginationPage, setPaginationPage] = useState(1);
  const [count, setCount] = useState(1);

  const { openAddBarangDialog } = useAdminAddBarangDialog();

  const { data: barangKategori } = useFetchOnMount({
    url: "/kategori/1",
    method: "GET",
  });  

  const handleChangePaginationPage = (event, value) => {
    setPaginationPage(value);
  };

  return (
    <div className="mb-8">
      <AlatPraktikumTableData paginationPage={paginationPage} setCount={setCount} />

      <div className="flex justify-between items-start mt-5">
        <button
          onClick={() => openAddBarangDialog()}
          className="flex items-center bg-main hover:bg-main-hover transition-all duration-100 py-2 px-5 rounded-sm text-white">
          <p className="text-xs tracking-wide mr-2">Tambah Data Alat Praktikum</p> <AddCircleOutline fontSize="small" />
        </button>
        <Pagination
          count={count}
          variant="outlined"
          color="primary"
          size="small"
          shape="rounded"
          onChange={handleChangePaginationPage}
        />
      </div>

      <AdminBarangInformation barangKategori={barangKategori} />
      <AdminAddBarangDialog barangKategori={barangKategori} />
      <AdminEditBarangDialog />
    </div>
  );
};

export default AdminAlatScreen;
