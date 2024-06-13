import PropTypes from "prop-types";
import { Close } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import { useAdminBarangInformationDialog } from "../../../hooks/useDialog";
import { date } from "../../../utils/datetime";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";

const AdminBarangInformation = ({ barangKategori }) => {
  const { isBarangInformationDialogOpen, closeBarangInformationDialog } = useAdminBarangInformationDialog();

  const { data: dataBarangPraktikum } = useFetchOnMount({
    url: `/barang/pagination/${barangKategori?.id}/8`,
    method: "GET",
  });

  return (
    <Dialog open={isBarangInformationDialogOpen} onClose={() => closeBarangInformationDialog()} sx={{ zIndex: 20 }}>
      <div className="flex justify-between">
        <div className="py-3 px-6 bg-green-600 w-full">
          <p className="text-lg font-semibold tracking-wider text-white">Detail Data Informasi Barang Praktikum</p>
        </div>

        <button onClick={() => closeBarangInformationDialog()} className="py-3 px-6 bg-zinc-400">
          <Close className="text-white" />
        </button>
      </div>
      <div className="p-6">
        <table className="w-full">
          <tbody>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">Kategori Barang</th>
              <td className="border-2 p-3 tracking-wide text-sm">{barangKategori?.id === 1 ? "Alat" : "Bahan"}</td>
            </tr>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">Jumlah Barang Tercatat</th>
              <td className="border-2 p-3 tracking-wide text-sm">{dataBarangPraktikum?.total}</td>
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

AdminBarangInformation.propTypes = {
  barangKategori: PropTypes.any,
};

export default AdminBarangInformation;
