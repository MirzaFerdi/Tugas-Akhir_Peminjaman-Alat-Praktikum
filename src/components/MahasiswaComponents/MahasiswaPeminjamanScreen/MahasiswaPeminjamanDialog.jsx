import FormField from "../../FormField/FormField";
import { Close } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import { Form, Formik } from "formik";
import { useConfirmDialog, useMahasiswaPeminjamanDialog } from "../../../hooks/useDialog";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { useCallback } from "react";
import { peminjamanFormValidation } from "../../../utils/validations";
import { useAlert } from "../../../hooks/useAlert";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";

const MahasiswaPeminjamanDialog = () => {
  const { isMahasiswaPeminjamanDialogOpen, barangId, closeMahasiswaPeminjamanDialog } = useMahasiswaPeminjamanDialog();
  const { openConfirmDialog } = useConfirmDialog();
  const { openAlertComponent } = useAlert();
  const { userId } = JSON.parse(localStorage.getItem("user_payloads"));
  const { data: dataBarangById } = useFetchOnMount({
    url: `/barang/${barangId}`,
    method: "GET",
  });
  const { fetchData: fetchPeminjaman } = useFetchOnClick();

  const initialValues = {
    user_id: userId,
    barang_id: barangId,
    keterangan: "",
    status: "Pending",
    jumlah_peminjaman: "",
    tanggal_peminjaman: new Date(Date.now() + 25_200_000).toISOString().slice(0, 19).replace("T", " "),
  };

  const handleSuccessPeminjaman = useCallback(
    (successPeminjamanResponse) => {
      openAlertComponent({
        alertType: "success",
        alertTitle: "BERHASIL!",
        alertMessage: successPeminjamanResponse?.message,
      });
    },
    [openAlertComponent]
  );

  const handleErrorPeminjaman = useCallback((errorPeminjamanResponse) => {
    console.log(errorPeminjamanResponse);
  }, []);

  const handleSubmit = (values) => {
    if (parseInt(values?.jumlah_peminjaman) > parseInt(dataBarangById?.stok_tersedia)) {
      openAlertComponent({
        alertType: "error!",
        alertTitle: "Error!",
        alertMessage: "Jumlah peminjaman melebibi jumlah stok tersedia!",
      });
    } else {
      openConfirmDialog({
        title: "Pinjam Barang Praktikum",
        message: "Apakah anda yakin ingin meminjam barang berikut?",
        okAction: () => {
          fetchPeminjaman({
            url: "/peminjaman",
            method: "POST",
            body: {
              user_id: values.user_id,
              barang_id: values.barang_id,
              keterangan: values.keterangan,
              status: "Pending",
              jumlah_peminjaman: parseInt(values.jumlah_peminjaman),
              tanggal_peminjaman: new Date(Date.now() + 25_200_000).toISOString().slice(0, 19).replace("T", " "),
            },
            onSuccess: handleSuccessPeminjaman,
            onError: handleErrorPeminjaman,
          });
        },
      });
    }
  };

  return (
    <Dialog open={isMahasiswaPeminjamanDialogOpen} onClose={() => closeMahasiswaPeminjamanDialog()} sx={{ zIndex: 10 }}>
      <div className="flex justify-between">
        <div className="py-2 lg:py-3 px-3 lg:px-6 bg-blue-400 w-full">
          <p className="text-xs lg:text-md font-semibold tracking-wider text-white">
            Formulir Peminjaman Alat dan Bahan Praktikum
          </p>
        </div>

        <button onClick={() => closeMahasiswaPeminjamanDialog()} className="py-3 px-6 bg-zinc-300">
          <Close className="text-white" fontSize="smal" />
        </button>
      </div>
      <div className="p-5">
        <Formik initialValues={initialValues} validate={peminjamanFormValidation} onSubmit={handleSubmit}>
          {({ isValid }) => (
            <Form>
              <div className="mb-4">
                <FormField formType="text" formName="keterangan" labelText="Keterangan Peminjaman" />
              </div>
              <div className="mb-6">
                <FormField formType="text" formName="jumlah_peminjaman" labelText="Jumlah Peminjaman" />
              </div>

              <button
                disabled={!isValid}
                type="submit"
                className="cursor-pointer py-3 px-5 rounded-sm text-sm tracking-wide text-white disabled:bg-zinc-500 disabled:hover:bg-zinc-500 bg-blue-400 hover:bg-blue-500 leading-none">
                Pinjam Sekarang
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

export default MahasiswaPeminjamanDialog;
