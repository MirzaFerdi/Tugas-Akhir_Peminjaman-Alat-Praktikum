import Kelas1TableData from "./Kelas1TableData";
import AdminKelasInformation from "../AdminKelasInformation";
import AdminKelasAddMahasiswaDialog from "../AdminKelasAddMahasiswaDialog";
import AdminKelasEditMahasiswaDialog from "../AdminKelasEditMahasiswaDialog";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";
import { useMediaQuery } from "react-responsive";
import Kelas1SmallTableData from "./Kelas1SmallTableData";

const Kelas1 = () => {  
  const isMobile = useMediaQuery({ query: "(max-width: 1439px)" });
  
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
      {isMobile ? (
        <Kelas1SmallTableData />
      ) : (
        <Kelas1TableData />
      )}      

      <AdminKelasInformation dataKelas={dataInformasiKelas1} dataMahasiswa={dataMahasiswaKelas1} />
      <AdminKelasAddMahasiswaDialog kelas={dataInformasiKelas1} />
      <AdminKelasEditMahasiswaDialog />
    </div>
  );
};

export default Kelas1;
