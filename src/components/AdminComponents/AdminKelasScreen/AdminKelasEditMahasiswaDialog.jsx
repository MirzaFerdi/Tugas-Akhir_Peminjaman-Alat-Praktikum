import PropTypes from "prop-types";
import FormField from "../../FormField/FormField";
import { Close } from "@mui/icons-material";
import { useAdminEditMahasiswaDialog, useConfirmDialog } from "../../../hooks/useDialog";
import { Dialog } from "@mui/material";
import { editMahasiswaFormValidation } from "../../../utils/validations";
import { Form, Formik } from "formik";
import { useAlert } from "../../../hooks/useAlert";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { useCallback } from "react";

const AdminKelasEditMahasiswaDialog = () => {
  const { isAdminEditMahasiswaDialogOpen, mahasiswaDataById, closeEditMahasiswaDialog } = useAdminEditMahasiswaDialog();
  const { openConfirmDialog } = useConfirmDialog();
  const { openAlertComponent } = useAlert();

  const { fetchData: editDataMahasiswa } = useFetchOnClick();

  const initialValues = {
    id: mahasiswaDataById?.id,
    nama: mahasiswaDataById?.nama,
    username: mahasiswaDataById?.username,
    email: mahasiswaDataById?.email,
    nohp: mahasiswaDataById?.nohp,
    role_id: 2,
    kelas_id: parseInt(mahasiswaDataById?.kelas_id),
  };

  const handleEditMahasiswaSuccessResponse = useCallback(
    (editMahasiswaSuccessResponse) => {
      if (editMahasiswaSuccessResponse.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: editMahasiswaSuccessResponse?.message,
        });
      }
    },
    [openAlertComponent]
  );

  const handleEditMahasiswaErrorResponse = useCallback((editMahasiswaErrorResponse) => {
    console.log(editMahasiswaErrorResponse);
  }, []);

  const handleSubmit = (values) => {
    openConfirmDialog({
      title: "Rubah Data Mahasiswa",
      message: "Apakah anda yakin ingin merubah data mahasiswa tersebut?",
      okAction: () => {
        editDataMahasiswa({
          url: `/user/${values?.id}`,
          method: "POST",
          body: values,
          onSuccess: handleEditMahasiswaSuccessResponse,
          onError: handleEditMahasiswaErrorResponse,
        });
      },
    });
  };

  return (
    <Dialog open={isAdminEditMahasiswaDialogOpen} onClose={() => closeEditMahasiswaDialog()} sx={{zIndex: 20}}>
      <div className="flex justify-between">
        <div className="py-3 px-6 bg-blue-400 w-full">
          <p className="text-lg font-semibold tracking-wider text-white">
            Formulir Edit Mahasiswa Kelas {mahasiswaDataById?.kelas_id}
          </p>
        </div>

        <button onClick={() => closeEditMahasiswaDialog()} className="py-3 px-6 bg-zinc-300">
          <Close className="text-white" />
        </button>
      </div>
      <div className="p-5">
        <Formik initialValues={initialValues} validate={editMahasiswaFormValidation} onSubmit={handleSubmit}>
          {({ isValid }) => (
            <Form>
              <div className="mb-4">
                <FormField formType="text" formName="nama" labelText="Nama Mahasiswa" />
              </div>
              <div className="mb-4">
                <FormField formType="text" formName="username" labelText="NIM" />
              </div>
              <div className="mb-4">
                <FormField formType="email" formName="email" labelText="E-Mail" />
              </div>
              <div className="mb-6">
                <FormField formType="text" formName="nohp" labelText="Nomor Telepon" />
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

AdminKelasEditMahasiswaDialog.propTypes = {
  selectedMahasiswaDataById: PropTypes.any,
};

export default AdminKelasEditMahasiswaDialog;
