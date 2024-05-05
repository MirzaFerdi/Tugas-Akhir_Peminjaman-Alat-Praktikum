import { Close } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import { Form, Formik } from "formik";
import FormField from "../../FormField/FormField";
import { useConfirmDialog, useMahasiswaPeminjamanDialog } from "../../../hooks/useDialog";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { useCallback } from "react";
import { peminjamanFormValidation } from "../../../utils/validations";
import { useAlert } from "../../../hooks/useAlert";

const MahasiswaPeminjamanDialog = () => {
  const { isMahasiswaPeminjamanDialogOpen, barangId, closeMahasiswaPeminjamanDialog } = useMahasiswaPeminjamanDialog();
  const { openConfirmDialog } = useConfirmDialog();
  const { openAlertComponent, closeAlertComponent } = useAlert();
  const { fetchData: fetchPeminjaman } = useFetchOnClick();

  const userPayloads = JSON.parse(localStorage.getItem("user_payloads"));

  const initialValues = {
    user_id: userPayloads?.user?.id,
    barang_id: barangId,
    keterangan: "",
    status: "Pending",
    tanggal_peminjaman: new Date(Date.now() + 25_200_000).toISOString().slice(0, 19).replace("T", " "),
  };

  const handleSuccessPeminjaman = useCallback(
    (successPeminjamanResponse) => {
      openAlertComponent({
        alertType: "success",
        alertTitle: "BERHASIL!",
        alertMessage: successPeminjamanResponse?.message,
      });

      setTimeout(() => {
        closeAlertComponent();

        return window.location.reload();
      }, 2000);
    },
    [closeAlertComponent, openAlertComponent]
  );

  const handleErrorPeminjaman = useCallback((errorPeminjamanResponse) => {
    console.log(errorPeminjamanResponse);
  }, []);

  const handleSubmit = (values) => {
    openConfirmDialog({
      title: "Pinjam Barang Praktikum",
      message: "Apakah anda yakin ingin meminjam barang berikut?",
      okAction: () => {
        fetchPeminjaman({
          url: "/peminjaman",
          method: "POST",
          body: values,
          onSuccess: handleSuccessPeminjaman,
          onError: handleErrorPeminjaman,
        });
      },
    });
  };

  return (
    <Dialog open={isMahasiswaPeminjamanDialogOpen} onClose={() => closeMahasiswaPeminjamanDialog()}>
      <div className="flex justify-between">
        <div className="py-3 px-6 bg-blue-400 w-full">
          <p className="text-lg font-semibold tracking-wider text-white">
            Formulir Peminjaman Alat dan Bahan Praktikum
          </p>
        </div>

        <button onClick={() => closeMahasiswaPeminjamanDialog()} className="py-3 px-6 bg-zinc-300">
          <Close className="text-white" />
        </button>
      </div>
      <div className="p-5">
        <Formik initialValues={initialValues} validate={peminjamanFormValidation} onSubmit={handleSubmit}>
          {() => (
            <Form>
              <FormField formType="textArea" formName="keterangan" labelText="Keterangan Peminjaman" />

              <button
                type="submit"
                className="cursor-pointer py-3 px-5 rounded-sm text-sm tracking-wide text-white bg-blue-400 hover:bg-blue-500 leading-none">
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
