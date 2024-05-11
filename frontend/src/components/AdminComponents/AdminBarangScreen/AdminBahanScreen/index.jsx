import AdminBarangScreenHeader from "../AdminBarangScreenHeader";
import BahanPraktikumTableData from "./BahanPraktikumTableData";
import AdminAddBarangDialog from "../AdminAddBarangDialog";
import AdminBarangInformation from "../AdminBarangInformation";
import AdminEditBarangDialog from "../AdminEditBarangDialog";
import { useState } from "react";
import { AddCircleOutline } from "@mui/icons-material";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";
import { useAdminAddBarangDialog } from "../../../../hooks/useDialog";
import { Pagination } from "@mui/material";

const AdminBahanScreen = () => {
  const [bahanKeywords, setBahanKeyowrds] = useState("");
  const [paginationPage, setPaginationPage] = useState(1);
  const [count, setCount] = useState(1);

  const { openAddBarangDialog } = useAdminAddBarangDialog();

  const { data: barangKategori } = useFetchOnMount({
    url: "/kategori/2",
    method: "GET",
  });

  const handleSearchDataBarang = (event) => {
    setBahanKeyowrds(event.target.value);
  };

  const handleChangePaginationPage = (event, value) => {
    setPaginationPage(value);
  };

  return (
    <div className="mb-8">
      <AdminBarangScreenHeader barangKategori={barangKategori} handleSearchDataBarang={handleSearchDataBarang} />
      <BahanPraktikumTableData bahanKeywords={bahanKeywords} paginationPage={paginationPage} setCount={setCount} />

      <div className="flex justify-between items-start">
        <button
          onClick={() => openAddBarangDialog()}
          className="mt-5 flex items-center bg-blue-400 hover:bg-blue-500 transition-all duration-100 py-2 px-5 rounded-sm text-white">
          <p className="text-xs tracking-wide mr-2">Tambah Data Bahan Praktikum</p>{" "}
          <AddCircleOutline fontSize="small" />
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

export default AdminBahanScreen;
