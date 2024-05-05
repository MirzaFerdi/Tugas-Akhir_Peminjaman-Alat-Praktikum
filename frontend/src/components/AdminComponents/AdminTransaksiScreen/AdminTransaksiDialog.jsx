import { Close } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import { useAdminTransaksiDialog, useConfirmDialog } from "../../../hooks/useDialog";
import { date, time } from "../../../utils/datetime";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";
import { useAlert } from "../../../hooks/useAlert";
import { useCallback } from "react";

const AdminTransaksiDialog = () => {
  const currentTransaksiCategory = JSON.parse(localStorage.getItem("last_visited_admin_transaksi_page_id"));

  const { isAdminTransaksiDialogOpen, idTransaksi, closeTransaksiDialog } = useAdminTransaksiDialog();
  const { openConfirmDialog, closeConfirmDialog } = useConfirmDialog();
  const { openAlertComponent, closeAlertComponent } = useAlert();

  const { data: dataTransaksiById } = useFetchOnMount({
    url: currentTransaksiCategory === 1 ? `/peminjaman/${idTransaksi}` : `/pengembalian/${idTransaksi}`,
    method: "GET",
  });

  const { fetchData: approveTransaksi } = useFetchOnClick();
  const { fetchData: rejectTransaksi } = useFetchOnClick();

  const handleSuccessApprovePeminjamanResponse = useCallback(
    (successApprovePeminjamanResponse) => {
      if (successApprovePeminjamanResponse?.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: successApprovePeminjamanResponse?.message,
        });

        setTimeout(() => {
          closeAlertComponent();
          closeConfirmDialog();
          window.location.reload();
        }, 2000);
      }
    },
    [closeAlertComponent, closeConfirmDialog, openAlertComponent]
  );

  const handleErrorApprovePeminjamanResponse = useCallback((errorApprovePeminjamanResponse) => {
    console.log(errorApprovePeminjamanResponse);
  }, []);

  const handleApprovePeminjaman = (id) => {
    openConfirmDialog({
      title: "Terima Peminjaman",
      message: `Apakah anda yakin akan menerima ${
        currentTransaksiCategory === 1 ? "peminjaman" : "pengembalian"
      } dari mahasiswa tersebut?`,
      okAction: () => {
        approveTransaksi({
          url: currentTransaksiCategory === 1 ? `/peminjaman/approve/${id}` : `/pengembalian/approve/${id}`,
          method: "PUT",
          onSuccess: handleSuccessApprovePeminjamanResponse,
          onError: handleErrorApprovePeminjamanResponse,
        });
      },
    });
  };

  const handleSuccessRejectPeminjamanResponse = useCallback(
    (successRejectPeminjamanResponse) => {
      if (successRejectPeminjamanResponse.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: successRejectPeminjamanResponse?.message,
        });

        setTimeout(() => {
          closeAlertComponent();
          closeConfirmDialog();
          window.location.reload();
        }, 2000);
      }
    },
    [closeAlertComponent, closeConfirmDialog, openAlertComponent]
  );

  const handleErrorRejectPeminjamanResponse = useCallback((errorRejectPeminjamanResponse) => {
    console.log(errorRejectPeminjamanResponse);
  }, []);

  const handleRejectPeminjaman = (id) => {
    openConfirmDialog({
      title: "Tolak Peminjaman",
      message: `Apakah anda yakin akan menolak ${
        currentTransaksiCategory === 1 ? "peminjaman" : "pengembalian"
      } dari mahasiswa tersebut?`,
      okAction: () => {
        rejectTransaksi({
          url: currentTransaksiCategory === 1 ? `/peminjaman/reject/${id}` : `/pengembalian/reject/${id}`,
          method: "PUT",
          onSuccess: handleSuccessRejectPeminjamanResponse,
          onError: handleErrorRejectPeminjamanResponse,
        });
      },
    });
  };

  return (
    <Dialog open={isAdminTransaksiDialogOpen} onClose={() => closeTransaksiDialog()}>
      <div className="flex justify-between">
        <div className="py-3 px-6 bg-blue-400 w-full">
          <p className="text-lg font-semibold tracking-wider text-white">
            Detail Transaksi {currentTransaksiCategory === 1 ? "Peminjaman" : "Pengembalian"}
          </p>
        </div>

        <button onClick={() => closeTransaksiDialog()} className="py-3 px-6 bg-zinc-400">
          <Close className="text-white" />
        </button>
      </div>
      <div className="p-6">
        <table className="w-full">
          <tbody>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">
                Nama {currentTransaksiCategory === 1 ? "Peminjam" : "Pengembali"}
              </th>
              <td className="border-2 p-3 tracking-wide text-sm">{dataTransaksiById?.user?.nama}</td>
            </tr>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">Barang di Pinjam</th>
              <td className="border-2 p-3 tracking-wide text-sm">{dataTransaksiById?.barang?.nama_barang}</td>
            </tr>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">Tanggal Peminjaman</th>
              <td className="border-2 p-3 tracking-wide text-sm">
                {currentTransaksiCategory === 1
                  ? date(dataTransaksiById?.tanggal_peminjaman)
                  : date(dataTransaksiById?.tanggal_pengembalian)}
              </td>
            </tr>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">
                Waktu {currentTransaksiCategory === 1 ? "Peminjaman" : "Pengembalian"}
              </th>
              <td className="border-2 p-3 tracking-wide text-sm">
                {currentTransaksiCategory === 1
                  ? time(dataTransaksiById?.tanggal_peminjaman)
                  : time(dataTransaksiById?.tanggal_pengembalian)}{" "}
                wib
              </td>
            </tr>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">
                Status {currentTransaksiCategory === 1 ? "Peminjaman" : "Pengembalian"}
              </th>
              <td className="border-2 p-3 tracking-wide text-sm">
                <p
                  className={`p-2 ${
                    dataTransaksiById.status === "Diterima"
                      ? "bg-green-500"
                      : dataTransaksiById.status === "Ditolak"
                      ? "bg-red-400"
                      : "bg-zinc-500"
                  } text-white`}>
                  {dataTransaksiById.status}
                </p>
              </td>
            </tr>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">
                Keterangan {currentTransaksiCategory === 1 ? "Peminjaman" : "Pengembalian"}
              </th>
              <td className="border-2 p-3 tracking-wide text-sm">{dataTransaksiById.keterangan}</td>
            </tr>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">Aksi</th>
              <td className="border-2 p-3 tracking-wide text-sm">
                <div className="flex justify-between items-center gap-4">
                  <button
                    disabled={dataTransaksiById.status !== "Pending" ? true : false}
                    onClick={() => handleApprovePeminjaman(dataTransaksiById?.id)}
                    className={`${
                      dataTransaksiById.status !== "Pending" ? "bg-zinc-300" : "bg-blue-400 hover:bg-blue-500"
                    } w-full p-3  transition-all duration-150 rounded-sm leading-none text-white`}>
                    Approve
                  </button>
                  <button
                    disabled={dataTransaksiById.status !== "Pending" ? true : false}
                    onClick={() => handleRejectPeminjaman(dataTransaksiById.id)}
                    className={`${
                      dataTransaksiById.status !== "Pending" ? "bg-zinc-300" : "bg-red-400 hover:bg-red-500"
                    } w-full p-3  transition-all duration-150 rounded-sm leading-none text-white`}>
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

export default AdminTransaksiDialog;
