import { Dialog } from "@mui/material";
import { useAdminRequestPengembalianDialog, useConfirmDialog } from "../../../hooks/useDialog";
import { useAlert } from "../../../hooks/useAlert";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { Close } from "@mui/icons-material";
import { date, time } from "../../../utils/datetime";
import { useCallback } from "react";

const AdminRequestPengembalianDialog = () => {
  const { requestPengembalianById, isAdminRequestPengembalianDialogOpen, closeRequestPengembalianDialog } =
    useAdminRequestPengembalianDialog();

  const { openConfirmDialog } = useConfirmDialog();
  const { openAlertComponent } = useAlert();

  const { fetchData: pengembalianById } = useFetchOnClick();
  const { fetchData: approvePengembalian } = useFetchOnClick();
  const { fetchData: approveBarangRusak } = useFetchOnClick();
  const { fetchData: approveBarangHabis } = useFetchOnClick();
  const { fetchData: rejectPengembalian } = useFetchOnClick();

  const handleSuccessApproveResponse = useCallback((response) => {
    console.log("Approve Pengembalian: ", response)
  }, []);

  const handleSuccessApproveBarangRusak = useCallback((response) => {
    console.log("Approve Pengembalian Barang Rusak:", response)
  }, []);

  const handleSuccessApproveBarangHabis = useCallback((response) => {
    console.log("Approve Pengembalian Barang Habis", response)
  }, []);

  const handleGetPengembalianByIdResponse = useCallback(
    (id) => (getPengembalianByIdResponse) => {
      if (getPengembalianByIdResponse?.data?.kondisi_barang?.length == 0) {
        openConfirmDialog({
          title: "Terima Pengembalian",
          message: "Apakah anda yakin akan menerima pengembalian dari mahasiswa tersebut?",
          okAction: () => {
            approvePengembalian({
              url: `/pengembalian/approve/${id}`,
              method: "PUT",
              onSuccess: handleSuccessApproveResponse,
            });
          },
        });
      } else {
        const isAlat = getPengembalianByIdResponse?.data?.kondisi_barang[0];

        if (isAlat?.kondisi_barang == "Alat Rusak") {
          openConfirmDialog({
            title: "Terima Pengembalian",
            message: "Apakah anda yakin akan menerima pengembalian dari mahasiswa tersebut?",
            okAction: () => {
              approveBarangRusak({
                url: `/pengembalian/approve/barangrusak/${id}`,
                method: "PUT",
                onSuccess: handleSuccessApproveBarangRusak,
              });
            },
          });
        }

        if (isAlat?.kondisi_barang == "Bahan Habis Pakai") {
          openConfirmDialog({
            title: "Terima Pengembalian",
            message: "Apakah anda yakin akan menerima pengembalian dari mahasiswa tersebut",
            okAction: () => {
              approveBarangHabis({
                url: `/pengembalian/approve/bahanhabis/${id}`,
                method: "PUT",
                onSuccess: handleSuccessApproveBarangHabis,
              });
            },
          });
        }
      }
    },
    [
      openConfirmDialog,
      approvePengembalian,
      handleSuccessApproveResponse,
      approveBarangRusak,
      handleSuccessApproveBarangRusak,
      approveBarangHabis,
      handleSuccessApproveBarangHabis,
    ]
  );

  const handleApprovePengembalian = (id) => {
    pengembalianById({
      url: `/pengembalian/${id}`,
      method: "GET",
      onSuccess: handleGetPengembalianByIdResponse(id),
    });
  };

  const handleSuccessRejectResponse = useCallback(
    (successRejectResponse) => {
      if (successRejectResponse.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: successRejectResponse?.message,
        });
      }
    },
    [openAlertComponent]
  );

  const handleRejectPengembalian = (id) => {
    openConfirmDialog({
      title: "Tolak Pengembalian",
      message: "Apakah anda yakin akan menolak pengembalian dari mahasiswa tersebut?",
      okAction: () => {
        rejectPengembalian({
          url: `/pengembalian/reject/${id}`,
          method: "PUT",
          onSuccess: handleSuccessRejectResponse,
        });
      },
    });
  };

  return (
    <Dialog
      open={isAdminRequestPengembalianDialogOpen}
      onClose={() => closeRequestPengembalianDialog()}
      sx={{ zIndex: 20 }}>
      <div className="flex justify-between">
        <div className="py-2 lg:py-3 px-4 lg:px-6 bg-blue-400 w-full">
          <p className="text-sm lg:text-md font-semibold tracking-wider text-white">Detail Transaksi Pengembalian</p>
        </div>

        <button
          onClick={() => closeRequestPengembalianDialog()}
          className="lg:py-3 px-4 lg:px-6 bg-zinc-200 text-red-600 hover:text-red-700 transition-colors duration-150">
          <Close fontSize="small" />
        </button>
      </div>
      <div className="p-6">
        <table className="w-full">
          <tbody>
            <tr>
              <th className="border-2 p-2 lg:p-3 text-start text-xs lg:text-sm font-semibold tracking-wide">
                Nama Pengembali
              </th>
              <td className="border-2 p-2 lg:p-3 tracking-wide text-xs lg:text-sm">
                {requestPengembalianById?.user?.nama}
              </td>
            </tr>
            <tr>
              <th className="border-2 p-2 lg:p-3 text-start text-xs lg:text-sm font-semibold tracking-wide">
                Barang di Kembalikan
              </th>
              <td className="border-2 p-2 lg:p-3 tracking-wide text-xs lg:text-sm">
                {requestPengembalianById?.barang?.nama_barang}
              </td>
            </tr>
            <tr>
              <th className="border-2 p-2 lg:p-3 text-start text-xs lg:text-sm font-semibold tracking-wide">
                Tanggal Pengembalian
              </th>
              <td className="border-2 p-2 lg:p-3 tracking-wide text-xs lg:text-sm">
                {date(requestPengembalianById?.tanggal_pengembalian)}
              </td>
            </tr>
            <tr>
              <th className="border-2 p-2 lg:p-3 text-start text-xs lg:text-sm font-semibold tracking-wide">
                Waktu Pengembalian
              </th>
              <td className="border-2 p-2 lg:p-3 tracking-wide text-xs lg:text-sm">
                {time(requestPengembalianById?.tanggal_pengembalian)} wib
              </td>
            </tr>
            <tr>
              <th className="border-2 p-2 lg:p-3 text-start text-xs lg:text-sm font-semibold tracking-wide">
                Keterlambatan Pengembalian
              </th>
              <td className="border-2 p-2 lg:p-3 tracking-wide text-xs lg:text-sm">-</td>
            </tr>
            <tr>
              <th className="border-2 p-2 lg:p-3 text-start text-xs lg:text-sm font-semibold tracking-wide">
                Status Pengembalian
              </th>
              <td className="border-2 p-2 lg:p-3 tracking-wide text-xs lg:text-sm">
                <p
                  className={`p-2 ${
                    requestPengembalianById?.status === "Diterima"
                      ? "bg-green-500"
                      : requestPengembalianById?.status === "Ditolak"
                      ? "bg-red-400"
                      : "bg-zinc-500"
                  } text-white`}>
                  {requestPengembalianById?.status}
                </p>
              </td>
            </tr>
            <tr>
              <th className="border-2 p-2 lg:p-3 text-start text-xs lg:text-sm font-semibold tracking-wide">
                Keterangan Pengembalian
              </th>
              <td className="border-2 p-2 lg:p-3 tracking-wide text-xs lg:text-sm">
                {requestPengembalianById?.keterangan}
              </td>
            </tr>
            <tr>
              <th className="border-2 p-2 lg:p-3 text-start text-xs lg:text-sm font-semibold tracking-wide">Aksi</th>
              <td className="border-2 p-2 lg:p-3 tracking-wide text-xs lg:text-sm">
                <div className="flex justify-between items-center gap-4">
                  <button
                    disabled={requestPengembalianById?.status !== "Pending" ? true : false}
                    onClick={() => handleApprovePengembalian(requestPengembalianById?.id)}
                    className={`${
                      requestPengembalianById?.status !== "Pending" ? "bg-zinc-300" : "bg-blue-400 hover:bg-blue-500"
                    } w-full p-2 lg:p-3  transition-all duration-150 rounded-sm leading-none text-white`}>
                    Approve
                  </button>
                  <button
                    disabled={requestPengembalianById?.status !== "Pending" ? true : false}
                    onClick={() => handleRejectPengembalian(requestPengembalianById?.id)}
                    className={`${
                      requestPengembalianById?.status !== "Pending" ? "bg-zinc-300" : "bg-red-400 hover:bg-red-500"
                    } w-full p-2 lg:p-3  transition-all duration-150 rounded-sm leading-none text-white`}>
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Dialog>
  );
};

export default AdminRequestPengembalianDialog;
