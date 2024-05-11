import Kelas4TableData from "./Kelas4TableData";
import AdminKelasInformation from "../AdminKelasInformation";
import AdminKelasAddMahasiswaDialog from "../AdminKelasAddMahasiswaDialog";
import AdminKelasEditMahasiswaDialog from "../AdminKelasEditMahasiswaDialog";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";

const Kelas4 = () => {    
  const { data: dataInformasiKelas4 } = useFetchOnMount({
    url: "/kelas/4",
    method: "GET",
  });

  const { data: dataMahasiswaKelas4 } = useFetchOnMount({
    url: "/user/kelas/4",
    method: "GET",
  });

  return (
    <div className="mb-8">      
      <Kelas4TableData />

      <AdminKelasInformation dataKelas={dataInformasiKelas4} dataMahasiswa={dataMahasiswaKelas4} />
      <AdminKelasAddMahasiswaDialog kelas={dataInformasiKelas4} />
      <AdminKelasEditMahasiswaDialog />
    </div>
  );
};

export default Kelas4;
