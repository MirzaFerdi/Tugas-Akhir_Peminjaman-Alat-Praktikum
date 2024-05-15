import PropTypes from "prop-types";
import { Close } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import { date } from "../../../utils/datetime";
import { useAdminKelasInformationDialog } from "../../../hooks/useDialog";

const AdminKelasInformation = ({ dataKelas, dataMahasiswa }) => {
  const { isKelasInformationDialogOpen, closeKelasInformationDialog } = useAdminKelasInformationDialog();

  return (
    <Dialog open={isKelasInformationDialogOpen} onClose={() => closeKelasInformationDialog()}>
      <div className="flex justify-between">
        <div className="py-3 px-6 bg-green-600 w-full">
          <p className="text-lg font-semibold tracking-wider text-white">Detail Informasi Kelas {dataKelas?.id}</p>
        </div>

        <button onClick={() => closeKelasInformationDialog()} className="py-3 px-6 bg-zinc-400">
          <Close className="text-white" />
        </button>
      </div>
      <div className="p-6">
        <table className="w-full">
          <tbody>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">Kelas</th>
              <td className="border-2 p-3 tracking-wide text-sm">{dataKelas.id}</td>
            </tr>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">Dosen Pembimbing Akademik</th>
              <td className="border-2 p-3 tracking-wide text-sm">{dataKelas.dpa}</td>
            </tr>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">
                Jumlah Mahasiswa Terdaftar
              </th>
              <td className="border-2 p-3 tracking-wide text-sm">{dataMahasiswa?.total} Mahasiswa</td>
            </tr>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">Tahun Ajaran</th>
              <td className="border-2 p-3 tracking-wide text-sm">{dataKelas?.tahun_ajaran}</td>
            </tr>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">Diperbarui Tanggal</th>
              <td className="border-2 p-3 tracking-wide text-sm">{date(new Date())}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Dialog>
  );
};

AdminKelasInformation.propTypes = {
  dataKelas: PropTypes.any,
  dataMahasiswa: PropTypes.any,
};

export default AdminKelasInformation;
