import PropTypes from "prop-types";
import { ErrorOutline, Search } from "@mui/icons-material";
import { useAdminKelasInformationDialog } from "../../../hooks/useDialog";

const AdminKelasScreenHeader = ({ kelas, handleSearchMahasiswa }) => {
  const { openKelasInformationDialog } = useAdminKelasInformationDialog();

  return (
    <div className="grid grid-cols-3 items-center mb-3 px-3 py-2 bg-white shadow-md rounded-sm">
      <div>
        <button
          onClick={() => openKelasInformationDialog()}
          className="flex items-center bg-green-600 hover:bg-green-700 transition-all duration-100 py-2 px-5 rounded-sm text-white w-3/4">
          <p className="text-xs tracking-wide mr-2">Lihat Informasi Kelas {kelas?.id}</p>{" "}
          <ErrorOutline fontSize="small" />
        </button>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-sm tracking-wide text-center">Tabel Data Mahasiswa Kelas {kelas?.id}</p>
        <p className="text-sm tracking-wide text-zinc-500 text-center">Teknologi Rekayasa Otomotif</p>
      </div>
      <div className="flex justify-center lg:justify-end relative">
        <input
          type="text"
          autoComplete="off"
          className="p-2 text-xs border-2 border-blue-300 rounded-sm w-full lg:w-3/4 leading-none tracking-wide hover:border-blue-400 focus:outline-none focus:border-blue-400"
          name="keywords"
          placeholder={`cari mahasiswa kelas ${kelas?.id} ...`}
          onChange={handleSearchMahasiswa}
        />
        <button className="absolute top-1/2 -translate-y-1/2 right-2 text-blue-700">
          <Search />
        </button>
      </div>
    </div>
  );
};

AdminKelasScreenHeader.propTypes = {
  kelas: PropTypes.any,
  handleSearchMahasiswa: PropTypes.any,
};

export default AdminKelasScreenHeader;
