import AdminKelasScreenHeader from "../AdminKelasScreenHeader";
import Kelas4TableData from "./Kelas4TableData";
import AdminKelasInformation from "../AdminKelasInformation";
import AdminKelasAddMahasiswaDialog from "../AdminKelasAddMahasiswaDialog";
import AdminKelasEditMahasiswaDialog from "../AdminKelasEditMahasiswaDialog";
import { AddCircleOutline } from "@mui/icons-material";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";
import { useCallback, useState } from "react";
import { useAdminAddMahasiswaDialog, useAdminEditMahasiswaDialog } from "../../../../hooks/useDialog";
import { useFetchOnClick } from "../../../../hooks/useFetchOnClick";

const Kelas4 = () => {
  const [mahasiswaKeywords, setMahasiswaKeywords] = useState("");

  const { openAddMahasiswaDialog } = useAdminAddMahasiswaDialog();
  const { openEditMahasiswaDialog } = useAdminEditMahasiswaDialog();

  const { fetchData: getDataMahasiswaById } = useFetchOnClick();
  const { data: dataInformasiKelas4 } = useFetchOnMount({
    url: "/kelas/4",
    method: "GET",
  });

  const { data: dataMahasiswaKelas4 } = useFetchOnMount({
    url: "/user/kelas/4",
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

  const handleSearchMahasiswa = (event) => {
    setMahasiswaKeywords(event.target.value);
  };

  return (
    <div className="mb-8">
      <AdminKelasScreenHeader kelas={dataInformasiKelas4} handleSearchMahasiswa={handleSearchMahasiswa} />
      <Kelas4TableData mahasiswaKeywords={mahasiswaKeywords} handleEditMahasiswa={handleEditMahasiswa} />

      <button
        onClick={() => openAddMahasiswaDialog()}
        className="mt-5 flex items-center bg-blue-400 hover:bg-blue-500 transition-all duration-100 py-2 px-5 rounded-sm text-white">
        <p className="text-xs tracking-wide mr-2">Tambah Data Mahasiswa Kelas 4</p>{" "}
        <AddCircleOutline fontSize="small" />
      </button>

      <AdminKelasInformation dataKelas={dataInformasiKelas4} dataMahasiswa={dataMahasiswaKelas4} />
      <AdminKelasAddMahasiswaDialog kelas={dataInformasiKelas4} />
      <AdminKelasEditMahasiswaDialog />
    </div>
  );
};

export default Kelas4;
