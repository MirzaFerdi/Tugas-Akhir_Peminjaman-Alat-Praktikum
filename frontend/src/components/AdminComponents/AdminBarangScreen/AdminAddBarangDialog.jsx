import PropTypes from "prop-types";
import FormField from "../../FormField/FormField";
import { Close } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import { Form, Formik } from "formik";
import { useAdminAddBarangDialog, useConfirmDialog } from "../../../hooks/useDialog";
import { addBarangFormValidation } from "../../../utils/validations";
import { useAlert } from "../../../hooks/useAlert";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { useCallback } from "react";

const AdminAddBarangDialog = ({ barangKategori }) => {
  const { isAdminAddBarangDialogOpen, closeAddBarangDialog } = useAdminAddBarangDialog();
  const { openConfirmDialog, closeConfirmDialog } = useConfirmDialog();
  const { openAlertComponent, closeAlertComponent } = useAlert();

  const { fetchData: addBarangPraktikum } = useFetchOnClick();

  const initialValues = {
    namaBarang: "",
    kodeBarang: "",
    jumlahBarang: "",
  };

  const handleAddBarangSuccessResponse = useCallback(
    (addBarangSuccessResponse) => {
      if (addBarangSuccessResponse.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: addBarangSuccessResponse?.message,
        });

        setTimeout(() => {
          closeAlertComponent();
          closeConfirmDialog();
          closeAddBarangDialog();
          window.location.reload();
        }, 2000);
      }
    },
    [closeAddBarangDialog, closeAlertComponent, closeConfirmDialog, openAlertComponent]
  );

  const handleAddBarangErrorResponse = useCallback((addBarangErrorResponse) => {
    console.log(addBarangErrorResponse);
  }, []);

  const handleSubmit = (values) => {
    openConfirmDialog({
      title: `Tambah Data ${barangKategori?.id === 1 ? "Alat" : "Bahan"}`,
      message: `Apakah anda yakin ingin menambah data ${
        barangKategori?.id === 1 ? "Alat" : "Bahan"
      } praktikum tersebut?`,
      okAction: () => {
        addBarangPraktikum({
          url: "/barang",
          method: "POST",
          body: {
            kategori_id: barangKategori?.id,
            nama_barang: values?.namaBarang,
            kode_barang: values?.kodeBarang,
            stok_awal: values?.jumlahBarang,
            stok_tersedia: values?.jumlahBarang,
          },
          onSuccess: handleAddBarangSuccessResponse,
          onError: handleAddBarangErrorResponse,
        });
      },
    });
  };

  return (
    <Dialog open={isAdminAddBarangDialogOpen} onClose={() => closeAddBarangDialog()}>
      <div className="flex justify-between">
        <div className="py-3 px-6 bg-blue-400 w-full">
          <p className="text-lg font-semibold tracking-wider text-white">
            Formulir Tambah {barangKategori?.id === 1 ? "Alat" : "Bahan"} Praktikum
          </p>
        </div>

        <button onClick={() => closeAddBarangDialog()} className="py-3 px-6 bg-zinc-300">
          <Close className="text-white" />
        </button>
      </div>
      <div className="p-5">
        <Formik initialValues={initialValues} validate={addBarangFormValidation} onSubmit={handleSubmit}>
          {({ isValid }) => (
            <Form>
              <div className="mb-4">
                <FormField formType="text" formName="namaBarang" labelText="Nama Barang" />
              </div>
              <div className="mb-4">
                <FormField formType="text" formName="kodeBarang" labelText="Kode Barang" />
              </div>
              <div className="mb-6">
                <FormField formType="text" formName="jumlahBarang" labelText="Jumlah Barang" />
              </div>
              <button
                type="submit"
                disabled={isValid ? false : true}
                className={`${
                  isValid ? "bg-blue-400 hover:bg-blue-500" : " bg-zinc-400"
                } cursor-pointer py-3 px-5 rounded-sm text-sm tracking-wide text-white leading-none`}>
                Submit Data
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

AdminAddBarangDialog.propTypes = {
  barangKategori: PropTypes.any,
};

export default AdminAddBarangDialog;
