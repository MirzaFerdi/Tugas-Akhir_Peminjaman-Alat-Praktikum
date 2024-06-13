import FormField from "../../FormField/FormField";
import { Dialog } from "@mui/material";
import { useAlert } from "../../../hooks/useAlert";
import { useAdminEditKelasDialog, useConfirmDialog } from "../../../hooks/useDialog";
import { Close } from "@mui/icons-material";
import { Form, Formik } from "formik";
import { editKelasFormValidation } from "../../../utils/validations";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { useCallback } from "react";

const AdminEditKelasDialog = () => {
  const { isEditKelasDialogOpen, kelasDataById, closeEditKelasDialog } = useAdminEditKelasDialog();
  const { openConfirmDialog } = useConfirmDialog();
  const { openAlertComponent } = useAlert();

  const initialValues = {
    kelas: kelasDataById?.id,
    dpa: kelasDataById?.dpa,
    tahunAjaran: kelasDataById?.tahun_ajaran,
  };

  const handleEditKelasSuccessResponse = useCallback(
    (editKelasSuccessResponse) => {
      if (editKelasSuccessResponse?.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: editKelasSuccessResponse?.message,
        });
      }
    },
    [openAlertComponent]
  );

  const handleEditKelasErrorResponse = useCallback(
    (editKelasErrorResponse) => {
      openAlertComponent({
        alertType: "error",
        alertTitle: "ERROR!",
        alertMessage: editKelasErrorResponse?.message,
      });
    },
    [openAlertComponent]
  );

  const { fetchData: editKelas } = useFetchOnClick();

  const handleSubmit = (values) => {
    openConfirmDialog({
      title: "Edit Informasi Kelas",
      message: `Apakah anda yakin ingin merubah data informasi kelas ${values?.kelas}?`,
      okAction: () => {
        editKelas({
          url: `/kelas/${kelasDataById?.id}`,
          method: "PUT",
          body: {
            kelas: kelasDataById?.id,
            dpa: values?.dpa,
            tahun_ajaran: values?.tahunAjaran,
          },
          onSuccess: handleEditKelasSuccessResponse,
          onError: handleEditKelasErrorResponse,
        });
      },
    });
  };

  return (
    <Dialog open={isEditKelasDialogOpen} onClose={() => closeEditKelasDialog()} sx={{zIndex: 20}}>
      <div className="flex justify-between">
        <div className="py-3 px-6 bg-blue-400 w-full">
          <p className="text-lg font-semibold tracking-wider text-white">Formulir Edit Informasi Kelas</p>
        </div>

        <button onClick={() => closeEditKelasDialog()} className="py-3 px-6 bg-zinc-300">
          <Close className="text-white" />
        </button>
      </div>
      <div className="p-6">
        <Formik initialValues={initialValues} validate={editKelasFormValidation} onSubmit={handleSubmit}>
          {({ isValid }) => (
            <Form>
              <div className="mb-5">
                <FormField formName="dpa" formType="text" labelText="Nama DPA" />
              </div>
              <div className="mb-8">
                <FormField formName="tahunAjaran" formType="text" labelText="Tahun Ajaran" />
              </div>
              <button type="submit">
                <button
                  type="submit"
                  disabled={isValid ? false : true}
                  className={`${
                    isValid ? "bg-blue-400 hover:bg-blue-500" : " bg-zinc-400"
                  } cursor-pointer py-3 px-5 rounded-sm text-sm tracking-wide text-white leading-none`}>
                  Edit Kelas
                </button>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

export default AdminEditKelasDialog;
