import FormField from "../../FormField/FormField";
import React, { useCallback, useState } from "react";
import { Close } from "@mui/icons-material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Checkbox, Dialog, FormControlLabel } from "@mui/material";
import { useAdminEditBarangDialog, useConfirmDialog } from "../../../hooks/useDialog";
import { editBarangFormValidation } from "../../../utils/validations";
import { useAlert } from "../../../hooks/useAlert";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";

const AdminEditBarangDialog = () => {
  const [isAddStockDisabled, setIsAddStockDisabled] = useState(true);

  const { isAdminEditBarangDialogOpen, dataBarangById, closeEditBarangDialog } = useAdminEditBarangDialog();
  const { openConfirmDialog, closeConfirmDialog } = useConfirmDialog();
  const { openAlertComponent, closeAlertComponent } = useAlert();

  const { fetchData: editDataBarang } = useFetchOnClick();

  const initialValues = {
    id: dataBarangById?.id,
    kategoriId: parseInt(dataBarangById?.kategori_id),
    kodeBarang: dataBarangById?.kode_barang,
    namaBarang: dataBarangById?.nama_barang,
    stokAwal: dataBarangById?.stok_awal,
    stokTersedia: dataBarangById?.stok_tersedia,
    stokMasuk: "0",
  };

  const handleEditBarangSuccessResponse = useCallback(
    (editBarangSuccessResponse) => {
      if (editBarangSuccessResponse.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: editBarangSuccessResponse?.message,
        });

        setTimeout(() => {
          closeAlertComponent();
          closeConfirmDialog();
          closeEditBarangDialog();
          window.location.reload();
        }, 2000);
      }
    },
    [closeAlertComponent, closeConfirmDialog, closeEditBarangDialog, openAlertComponent]
  );

  const handleEditBarangErrorResponse = useCallback((editBarangErrorResponse) => {
    console.log(editBarangErrorResponse);
  }, []);

  const handleCloseEditBarangDialog = () => {
    setIsAddStockDisabled(true);
    closeEditBarangDialog();
  };

  const handleSubmit = (values) => {
    openConfirmDialog({
      title: "Edit Data Barang",
      message: "Apakah anda yakin ingin mengedit data barang tersebut?",
      okAction: () => {
        editDataBarang({
          url: `/barang/${values?.id}`,
          method: "PUT",
          body: {
            kategori_id: values?.kategoriId,
            nama_barang: values?.namaBarang,
            kode_barang: values?.kodeBarang,
            stok_awal: isAddStockDisabled
              ? parseInt(values?.stokAwal)
              : parseInt(values?.stokAwal) + parseInt(values?.stokMasuk),
            stok_tersedia: isAddStockDisabled
              ? parseInt(values?.stokAwal)
              : parseInt(values?.stokTersedia) + parseInt(values?.stokMasuk),
          },
          onSuccess: handleEditBarangSuccessResponse,
          onError: handleEditBarangErrorResponse,
        });
      },
    });
  };

  return (
    <Dialog open={isAdminEditBarangDialogOpen} onClose={() => handleCloseEditBarangDialog()}>
      <div className="flex justify-between">
        <div className="py-3 px-6 bg-blue-400 w-full">
          <p className="text-lg font-semibold tracking-wider text-white">
            Formulir Edit {initialValues?.kategoriId === 1 ? "Alat" : "Bahan"} Praktikum
          </p>
        </div>

        <button onClick={() => handleCloseEditBarangDialog()} className="py-3 px-6 bg-zinc-300">
          <Close className="text-white" />
        </button>
      </div>
      <div className="p-5">
        <Formik initialValues={initialValues} validate={editBarangFormValidation} onSubmit={handleSubmit}>
          {({ isValid, values, handleChange, setFieldValue }) => (
            <Form>
              <div className="mb-6">
                <FormField formType="text" formName="namaBarang" labelText="Nama Barang" />
              </div>
              <div className="mb-6">
                <FormField formType="text" formName="kodeBarang" labelText="Kode Barang" />
              </div>
              <div className="mb-6">
                <React.Fragment>
                  <div className="relative">
                    <Field
                      type="text"
                      autoComplete="off"
                      required
                      value={isAddStockDisabled ? values?.stokAwal : values?.stokAwal + " + " + values?.stokMasuk}
                      disabled={initialValues?.stokTersedia < initialValues?.stokAwal ? true : false}
                      name="stokAwal"
                      onChange={handleChange}
                      id="floating-outlined-stokAwal"
                      className="disabled:border-zinc-300 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-600 tracking-widest bg-transparent rounded-md border-2 border-blue-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-300 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="stokAwal"
                      className="tracking-wider cursor-text absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-inherit px-2 peer-focus:px-2 bg-white peer-focus:bg-white peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                      Stok Awal
                    </label>
                  </div>
                  <div className="text-xs tracking-wide text-red-500">
                    <ErrorMessage name="stokAwal" />
                  </div>
                </React.Fragment>
              </div>
              <div className="mb-6">
                <React.Fragment>
                  <div className="relative">
                    <Field
                      type="stokTersedia"
                      autoComplete="off"
                      required
                      disabled
                      value={
                        isAddStockDisabled ? values?.stokAwal : initialValues?.stokTersedia + " + " + values?.stokMasuk
                      }
                      name="stokTersedia"
                      onChange={handleChange}
                      id="floating-outlined-stokTersedia"
                      className="disabled:border-zinc-300 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-600 tracking-widest bg-transparent rounded-md border-2 border-blue-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-300 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="floating-outlined-stokTersedia"
                      className="tracking-wider cursor-text absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-inherit px-2 peer-focus:px-2 bg-white peer-focus:bg-white peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                      Stok Tersedia
                    </label>
                  </div>
                  <div className="text-xs tracking-wide text-red-500">
                    <ErrorMessage name="stokTersedia" />
                  </div>
                </React.Fragment>
              </div>
              <div className={`${initialValues?.stokTersedia < initialValues?.stokAwal ? "block" : "hidden"} mb-8`}>
                <React.Fragment>
                  <div className="relative">
                    <Field
                      type="stokMasuk"
                      autoComplete="off"
                      required
                      value={isAddStockDisabled ? initialValues?.stokMasuk : values?.stokMasuk}
                      disabled={isAddStockDisabled}
                      onChange={handleChange}
                      name="stokMasuk"
                      id="floating-outlined-stokMasuk"
                      className="disabled:border-zinc-300 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-600 tracking-widest bg-transparent rounded-md border-2 border-blue-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-300 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="floating-outlined-stokMasuk"
                      className="tracking-wider cursor-text absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-inherit px-2 peer-focus:px-2 bg-white peer-focus:bg-white peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                      Stok Masuk
                    </label>
                  </div>
                  <div className="text-xs tracking-wide text-red-500">
                    <ErrorMessage name="stokMasuk" />
                  </div>
                </React.Fragment>
                <div>
                  <FormControlLabel
                    control={<Checkbox onChange={() => setIsAddStockDisabled(!isAddStockDisabled)} />}
                    label="Tambah Stok"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isValid ? false : true}
                className={`${
                  isValid ? "bg-blue-400 hover:bg-blue-500 cursor-pointer" : " bg-zinc-400 cursor-default"
                } py-3 px-5 rounded-sm text-sm tracking-wide text-white leading-none`}>
                Submit Data
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

export default AdminEditBarangDialog;
