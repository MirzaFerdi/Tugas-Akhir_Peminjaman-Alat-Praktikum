import FormField from "../../FormField/FormField";
import { Dialog } from "@mui/material";
import { useConfirmDialog, useMahasiswaPengembalianDialog } from "../../../hooks/useDialog";
import { Close } from "@mui/icons-material";
import { Field, Form, Formik } from "formik";
import { pengembalianFormValidation } from "../../../utils/validations";
import { useCallback } from "react";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { useAlert } from "../../../hooks/useAlert";

const MahasiswaPengembalianDialog = () => {
  const { approvedDataPayloads, isMahasiswaPengembalianDialogOpen, closeMahasiswaPengembalianDialog } =
    useMahasiswaPengembalianDialog();

  const initialValues = {
    user_id: approvedDataPayloads?.user_id,
    barang_id: approvedDataPayloads?.barang_id,
    kategori_barang: approvedDataPayloads?.barang?.kategori_id,
    peminjaman_id: approvedDataPayloads?.id,
    keterangan: "",
    jumlah_kondisi: "",
    kondisi: "",
    jumlah_pengembalian: approvedDataPayloads?.jumlah_peminjaman,
  };  

  const { openAlertComponent } = useAlert();
  const { openConfirmDialog } = useConfirmDialog();

  const { fetchData: postPengembalian } = useFetchOnClick();
  const { fetchData: postKondisi } = useFetchOnClick();
  const { fetchData: updatePeminjamanId } = useFetchOnClick();

  const responsePutPeminjamanId = useCallback(
    (putResponse) => {      
      if (putResponse?.success == true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "Berhasil!",
          alertMessage: "Berhasil melakukan request pengembalian!",
        });
      }
    },
    [openAlertComponent]
  );

  const handleAfterPostPengembalian = useCallback(
    (values) => (response) => {      
      if (response.success == true) {
        updatePeminjamanId({
          url: `/peminjaman/pengembalian/id/${values?.peminjaman_id}`,
          method: "PUT",
          body: {
            pengembalian_id: response?.data?.id,
          },
          onSuccess: responsePutPeminjamanId,
        });

        if (values?.kondisi == true) {
          postKondisi({
            url: `/kondisibarang`,
            method: "POST",
            body: {
              user_id: values?.user_id,
              barang_id: values?.barang_id,
              pengembalian_id: response?.data?.id,
              jumlah_kondisi: values?.jumlah_kondisi,
              kondisi_barang: values?.kategori_barang == 1 ? "Alat Rusak" : "Bahan Habis Pakai",
            },
          });
        }
      }
    },
    [postKondisi, responsePutPeminjamanId, updatePeminjamanId]
  );

  const handleSubmit = (values) => {
    console.log(values)

    openConfirmDialog({
      title: "Request Pengembalian",
      message: "Apakah anda ingin mengembalikan barang tersebut?",
      okAction: () => {
        postPengembalian({
          url: "/pengembalian",
          method: "POST",
          body: {
            user_id: values?.user_id,
            barang_id: values?.barang_id,
            peminjaman_id: values?.peminjaman_id,
            keterangan: values?.keterangan,
            status: "Pending",
            jumlah_pengembalian: values?.jumlah_pengembalian,
            tanggal_pengembalian: new Date(Date.now() + 25_200_000).toISOString().slice(0, 19).replace("T", " "),
          },
          onSuccess: handleAfterPostPengembalian(values),
        });
      },
    });
  };

  return (
    <Dialog
      open={isMahasiswaPengembalianDialogOpen}
      onClose={() => closeMahasiswaPengembalianDialog()}
      sx={{ zIndex: 20 }}>
      <div className="flex justify-between">
        <div className="leading-tight lg:leading-normal py-2 lg:py-3 px-4 lg:px-6 bg-blue-400 w-full flex items-center">
          <p className="text-sm lg:text-md font-semibold tracking-wider text-white">
            Formulir Pengembalian Alat dan Bahan Praktikum
          </p>
        </div>

        <button onClick={() => closeMahasiswaPengembalianDialog()} className="py-2 lg:py-3 px-4 lg:px-6 bg-zinc-300">
          <Close className="text-white" fontSize="small" />
        </button>
      </div>
      <div className="p-4 lg:p-5">
        <Formik initialValues={initialValues} validate={pengembalianFormValidation} onSubmit={handleSubmit}>
          {({ isValid, values }) => {
            return (
              <Form>
                <div className="mb-3">
                  <FormField formType="text" formName="keterangan" labelText="Keterangan Pengembalian" />
                </div>
                <div className="px-1 mb-6 flex items-center">
                  <Field id="kondisi-checkbox" type="checkbox" name="kondisi" className="mr-2 h-4 w-4 cursor-pointer" />
                  <label htmlFor="kondisi-checkbox" className="text-sm leading-none tracking-wide text-zinc-600">
                    {approvedDataPayloads?.barang?.kategori_id == 1 ? "Terdapat Alat Rusak?" : "Terdapat Bahan Habis?"}
                  </label>
                </div>
                {values.kondisi && (
                  <div className="mb-8">
                    <FormField
                      formType="text"
                      formName="jumlah_kondisi"
                      labelText={
                        approvedDataPayloads?.barang?.kategori_id == 1 ? "Jumlah Alat Rusak" : "Jumlah Bahan Habis"
                      }
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!isValid}
                  className="disabled:bg-zinc-500 disabled:hover:bg-zinc-500 cursor-pointer py-3 px-5 rounded-sm text-sm tracking-wide text-white bg-main hover:bg-main-hover transition-colors duration-150 leading-none">
                  Kembalikan
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Dialog>
  );
};

export default MahasiswaPengembalianDialog;
