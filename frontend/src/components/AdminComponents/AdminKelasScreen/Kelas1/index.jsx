import AdminKelasScreenHeader from "../AdminKelasScreenHeader";
import Kelas1TableData from "./Kelas1TableData";
import AdminKelasInformation from "../AdminKelasInformation";
import AdminKelasAddMahasiswaDialog from "../AdminKelasAddMahasiswaDialog";
import AdminKelasEditMahasiswaDialog from "../AdminKelasEditMahasiswaDialog";
import { AddCircleOutline } from "@mui/icons-material";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";
import { useCallback, useState } from "react";
import { useAdminAddMahasiswaDialog, useAdminEditMahasiswaDialog } from "../../../../hooks/useDialog";
import { useFetchOnClick } from "../../../../hooks/useFetchOnClick";

const Kelas1 = () => {
  const [mahasiswaKeywords, setMahasiswaKeywords] = useState("");

  const { openAddMahasiswaDialog } = useAdminAddMahasiswaDialog();
  const { openEditMahasiswaDialog } = useAdminEditMahasiswaDialog();

  const { fetchData: getDataMahasiswaById } = useFetchOnClick();
  const { data: dataInformasiKelas1 } = useFetchOnMount({
    url: "/kelas/1",
    method: "GET",
  });
  const { data: dataMahasiswaKelas1 } = useFetchOnMount({
    url: "/user/kelas/1",
    method: "GET",
  });

  const handleSuccessGetMahasiswaById = useCallback(
    (mahasiswaDataById) => {
      openEditMahasiswaDialog(mahasiswaDataById);
    },
    [openEditMahasiswaDialog]
  );

  const handleEditMahasiswa = (selectedMahasiswaId) => {
    getDataMahasiswaById({
      url: `/user/${selectedMahasiswaId}`,
      method: "GET",
      onSuccess: handleSuccessGetMahasiswaById,
    });
  };

  const handleDeleteMahasiswa = (selectedMahasiswaId) => {
    
  }

  const handleSearchMahasiswa = (event) => {
    setMahasiswaKeywords(event.target.value);
  };

  return (
    <div className="mb-8">
      <AdminKelasScreenHeader kelas={dataInformasiKelas1} handleSearchMahasiswa={handleSearchMahasiswa} />
      <Kelas1TableData        
        mahasiswaKeywords={mahasiswaKeywords}
        handleEditMahasiswa={handleEditMahasiswa}
      />

      <button
        onClick={() => openAddMahasiswaDialog()}
        className="mt-5 flex items-center bg-blue-400 hover:bg-blue-500 transition-all duration-100 py-2 px-5 rounded-sm text-white">
        <p className="text-xs tracking-wide mr-2">Tambah Data Mahasiswa Kelas 1</p>{" "}
        <AddCircleOutline fontSize="small" />
      </button>

      <AdminKelasInformation dataKelas={dataInformasiKelas1} dataMahasiswa={dataMahasiswaKelas1} />
      <AdminKelasAddMahasiswaDialog kelas={dataInformasiKelas1} />
      <AdminKelasEditMahasiswaDialog />
    </div>
  );
};

export default Kelas1;
