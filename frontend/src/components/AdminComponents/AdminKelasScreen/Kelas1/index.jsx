import Kelas1TableData from "./Kelas1TableData";
import AdminKelasInformation from "../AdminKelasInformation";
import AdminKelasAddMahasiswaDialog from "../AdminKelasAddMahasiswaDialog";
import AdminKelasEditMahasiswaDialog from "../AdminKelasEditMahasiswaDialog";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";

const Kelas1 = () => {  
  const { data: dataInformasiKelas1 } = useFetchOnMount({
    url: "/kelas/1",
    method: "GET",
  });
  const { data: dataMahasiswaKelas1 } = useFetchOnMount({
    url: "/user/kelas/1",
    method: "GET",
  });

  return (
    <div className="mb-8">
      <Kelas1TableData />

      <AdminKelasInformation dataKelas={dataInformasiKelas1} dataMahasiswa={dataMahasiswaKelas1} />
      <AdminKelasAddMahasiswaDialog kelas={dataInformasiKelas1} />
      <AdminKelasEditMahasiswaDialog />
    </div>
  );
};

export default Kelas1;
