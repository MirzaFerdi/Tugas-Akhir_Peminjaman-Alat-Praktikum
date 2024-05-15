import { Close } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import { Form, Formik } from "formik";
import FormField from "../../FormField/FormField";
import { useConfirmDialog, useMahasiswaPengembalianDialog } from "../../../hooks/useDialog";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { useCallback } from "react";
import { peminjamanFormValidation } from "../../../utils/validations";
import { useAlert } from "../../../hooks/useAlert";

const MahasiswaPengembalianDialog = () => {
  const { isMahasiswaPengembalianDialogOpen, approvedDataPayloads, closeMahasiswaPengembalianDialog } =
    useMahasiswaPengembalianDialog();

  const initialValues = {
    user_id: approvedDataPayloads?.user_id,
    barang_id: approvedDataPayloads?.barang_id,
    peminjaman_id: approvedDataPayloads?.id,
    keterangan: "",
    status: "Pending",
    tanggal_pengembalian: new Date(Date.now() + 25_200_000).toISOString().slice(0, 19).replace("T", " "),
  };

  const { openConfirmDialog, closeConfirmDialog } = useConfirmDialog();
  const { openAlertComponent, closeAlertComponent } = useAlert();

  const { fetchData: postPengembalian } = useFetchOnClick();
  const { fetchData: putPengembalian } = useFetchOnClick();

  const handlePengembalianSuccessResponse = useCallback(
    (pengembalianSuccessResponse) => {
      if (pengembalianSuccessResponse?.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: "Berhasil mengembalikan barang!",
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

  const handlePengembalianErrorResponse = useCallback((pengembalianErrorResponse) => {
    console.log(pengembalianErrorResponse);
  }, []);

  const handleSuccessPostPengembalian = useCallback(
    (postPengembalianSuccessResponse) => {
      if (postPengembalianSuccessResponse?.success === true) {
        putPengembalian({
          url: `/peminjaman/pengembalian/id/${approvedDataPayloads.id}`,
          method: "PUT",
          body: {
            pengembalian_id: postPengembalianSuccessResponse?.data?.id,
          },
          onSuccess: handlePengembalianSuccessResponse,
          onError: handlePengembalianErrorResponse,
        });
      }
    },
    [approvedDataPayloads.id, handlePengembalianErrorResponse, handlePengembalianSuccessResponse, putPengembalian]
  );

  const handleErrorPostPengembalian = useCallback((postPengembalianErrorResponse) => {
    console.log(postPengembalianErrorResponse);
  }, []);

  const handleSubmit = (values) => {
    openConfirmDialog({
      title: "Pinjam Barang Praktikum",
      message: "Apakah anda yakin ingin meminjam barang berikut?",
      okAction: () => {
        postPengembalian({
          url: "/pengembalian",
          method: "POST",
          body: values,
          onSuccess: handleSuccessPostPengembalian,
          onError: handleErrorPostPengembalian,
        });
      },
    });
  };

  return (
    <Dialog open={isMahasiswaPengembalianDialogOpen} onClose={() => closeMahasiswaPengembalianDialog()}>
      <div className="flex justify-between">
        <div className="py-3 px-6 bg-blue-400 w-full">
          <p className="text-md font-semibold tracking-wider text-white">
            Formulir Pengembalian Alat dan Bahan Praktikum
          </p>
        </div>

        <button onClick={() => closeMahasiswaPengembalianDialog()} className="py-3 px-6 bg-zinc-300">
          <Close className="text-white" />
        </button>
      </div>
      <div className="p-5">
        <Formik initialValues={initialValues} validate={peminjamanFormValidation} onSubmit={handleSubmit}>
          {() => (
            <Form>
              <div className="mb-6">
                <FormField formType="textArea" formName="keterangan" labelText="Keterangan Peminjaman" />
              </div>

              <button
                type="submit"
                className="cursor-pointer py-3 px-5 rounded-sm text-sm tracking-wide text-white bg-blue-400 hover:bg-blue-500 leading-none">
                Kembalikan
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

export default MahasiswaPengembalianDialog;
