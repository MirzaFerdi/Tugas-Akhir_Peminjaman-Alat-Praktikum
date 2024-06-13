import PropTypes from "prop-types";
import FormField from "../../FormField/FormField";
import { Close } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import { Form, Formik } from "formik";
import { addMahasiswaFormValidation } from "../../../utils/validations";
import { useAdminAddMahasiswaDialog, useConfirmDialog } from "../../../hooks/useDialog";
import { useAlert } from "../../../hooks/useAlert";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { useCallback } from "react";

const AdminKelasAddMahasiswaDialog = ({ kelas }) => {
  const { isAdminAddMahasiswaDialogOpen, closeAddMahasiswaDialog } = useAdminAddMahasiswaDialog();
  const { openConfirmDialog } = useConfirmDialog();
  const { openAlertComponent } = useAlert();

  const { fetchData: fetchAddMahasiswa } = useFetchOnClick();

  const initialValues = {
    nama: "",
    username: "",
    email: "",
    nohp: "",
    password: "",
    role_id: 2,
    foto: "",
    kelas_id: kelas?.id,
  };

  const handleAddMahasiswaSuccessResponse = useCallback(
    (addMahasiswaSuccessResponse) => {
      console.log(addMahasiswaSuccessResponse)

      if (addMahasiswaSuccessResponse?.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: addMahasiswaSuccessResponse?.message,
        });        
      }
    },
    [openAlertComponent]
  );

  const handleAddMahasiswaErrorResponse = useCallback(
    (addMahasiswaErrorResponse) => {
      if (addMahasiswaErrorResponse?.message) {
        openAlertComponent({
          alertType: "error",
          alertTitle: "ERROR!",
          alertMessage: addMahasiswaErrorResponse?.message,
        });        
      }
    },
    [openAlertComponent]
  );

  const handleSubmit = (values) => {
    openConfirmDialog({
      title: "Tambah Mahasiswa",
      message: `Apakah anda yakin ingin menambahkan data mahasiswa kelas ${kelas?.id} berikut?`,
      okAction: () => {
        fetchAddMahasiswa({
          url: "/user",
          method: "POST",
          body: values,
          onSuccess: handleAddMahasiswaSuccessResponse,
          onError: handleAddMahasiswaErrorResponse,
        });
      },
    });
  };

  return (
    <Dialog open={isAdminAddMahasiswaDialogOpen} onClose={() => closeAddMahasiswaDialog()} sx={{zIndex: 20}}>
      <div className="flex justify-between">
        <div className="py-2 lg:py-3 px-3 lg:px-6 bg-blue-400 w-full">
          <p className="text-sm leading-snug lg:text-lg font-semibold tracking-wider text-white">Formulir Tambah Mahasiswa Kelas {kelas?.id}</p>
        </div>

        <button onClick={() => closeAddMahasiswaDialog()} className="py-2 lg:py-3 px-3 lg:px-6 bg-zinc-300">
          <Close fontSize="small" className="text-white" />
        </button>
      </div>
      <div className="p-5">
        <Formik initialValues={initialValues} validate={addMahasiswaFormValidation} onSubmit={handleSubmit}>
          {({ isValid }) => (
            <Form>
              <div className="mb-2 lg:mb-4">
                <FormField formType="text" formName="nama" labelText="Nama Mahasiswa" />
              </div>
              <div className="mb-2 lg:mb-4">
                <FormField formType="text" formName="username" labelText="NIM" />
              </div>
              <div className="mb-2 lg:mb-4">
                <FormField formType="email" formName="email" labelText="E-Mail" />
              </div>
              <div className="mb-2 lg:mb-4">
                <FormField formType="text" formName="nohp" labelText="Nomor Telepon" />
              </div>
              <div className="mb-2 lg:mb-4">
                <FormField formType="password" formName="password" labelText="Password" />
              </div>
              <div className="mb-6">
                <FormField formType="password" formName="confPassword" labelText="Konfirmasi Password" />
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

AdminKelasAddMahasiswaDialog.propTypes = {
  kelas: PropTypes.any,
};

export default AdminKelasAddMahasiswaDialog;
