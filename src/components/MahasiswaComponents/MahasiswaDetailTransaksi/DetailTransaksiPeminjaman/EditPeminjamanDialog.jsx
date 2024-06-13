import PropTypes from "prop-types";
import FormField from "../../../FormField/FormField";
import { Dialog } from "@mui/material";
import { ArrowDropDown, ArrowDropUp, Close } from "@mui/icons-material";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";
import { Form, Formik } from "formik";
import { useCallback, useState } from "react";
import { useFetchOnClick } from "../../../../hooks/useFetchOnClick";
import { useAlert } from "../../../../hooks/useAlert";
import { useConfirmDialog } from "../../../../hooks/useDialog";
import { peminjamanFormValidation } from "../../../../utils/validations";

const EditPeminjamanDialog = ({ idPeminjaman, openEditPeminjamanDialog, setOpenPeminjamanDialog }) => {
  const { userId } = JSON.parse(localStorage.getItem("user_payloads"));

  const [stokTersedia, setStokTersedia] = useState(0);
  const [kategoriBarang, setKategoriBarang] = useState(1);
  const [isSelectOpen, setIsSelectOpen] = useState(true);

  const { data: dataPeminjamanById } = useFetchOnMount({
    url: `/peminjaman/${idPeminjaman}`,
    method: "GET",
  });

  const [barangKeywords, setBarangKeywords] = useState(dataPeminjamanById?.barang?.nama_barang);

  const { data: dataBarang } = useFetchOnMount({
    url: barangKeywords ? `/barang/search/${kategoriBarang}/${barangKeywords}` : `/barang/kategori/${kategoriBarang}`,
    method: "GET",
  });
  const { fetchData: updatePeminjaman } = useFetchOnClick();

  const initialValues = {
    user_id: userId,
    barang_id: "",
    keterangan: "",
    status: "Pending",
    tanggal_peminjaman: new Date(Date.now() + 25_200_000).toISOString().slice(0, 19).replace("T", " "),
  };

  const handleChange = (event) => {
    setBarangKeywords(event.target.value);
  };

  const { openAlertComponent } = useAlert();
  const { openConfirmDialog } = useConfirmDialog();

  const handleUpdatePeminjamanSuccessResponse = useCallback((updatePeminjamanSuccessResponse) => {
    if (updatePeminjamanSuccessResponse.success === true) {
      openAlertComponent({
        alertType: "success",
        alertTitle: "Berhasil!",
        alertMessage: "Berhasil merubah data request peminjaman!"
      })  
    }
  }, [openAlertComponent]);

  const handleUpdatePeminjamanErrorResponse = useCallback((updatePeminjamanErrorResponse) => {
    console.log(updatePeminjamanErrorResponse);
  }, []);

  const handleSubmit = (values) => {
    if (parseInt(values.jumlah_peminjaman) > stokTersedia) {
      openAlertComponent({
        alertType: "error",
        alertTitle: "Error!",
        alertMessage: "Jumlah peminjaman melebihi stok tersedia!",
      });
    } else {
      openConfirmDialog({
        title: "Rubah Request Peminjaman",
        message: "Apakah anda yakin ingin mengubah request peminjaman anda?",
        okAction: () => {
          updatePeminjaman({
            url: `/peminjaman/${idPeminjaman}`,
            method: "PUT",
            body: values,
            onSuccess: handleUpdatePeminjamanSuccessResponse,
            onError: handleUpdatePeminjamanErrorResponse,
          });
        },
      });
    }
  };

  return (
    <Dialog open={openEditPeminjamanDialog} onClose={() => setOpenPeminjamanDialog(false)} sx={{ zIndex: 20 }}>
      <div className="flex justify-between">
        <div className="py-3 px-6 bg-blue-400 w-full">
          <p className="text-lg font-semibold tracking-wider text-white">Formulir Edit Peminjaman</p>
        </div>

        <button onClick={() => setOpenPeminjamanDialog(false)} className="py-3 px-6 bg-zinc-300">
          <Close className="text-white" />
        </button>
      </div>
      <div className="px-6 py-4">
        <Formik initialValues={initialValues} validate={peminjamanFormValidation} onSubmit={handleSubmit}>
          {({ setFieldValue, isValid }) => {
            const handleNewBarang = (values) => {
              setBarangKeywords(values?.nama_barang);
              setStokTersedia(values?.stok_tersedia);
              setFieldValue("barang_id", values?.id, false);
            };

            return (
              <Form>
                <div className="mb-3">
                  <select
                    name="kategoriBarang"
                    className="p-3 text-xs w-full rounded-md cursor-pointer bg-white border-2 border-blue-200"
                    onChange={(event) => {
                      setKategoriBarang(event.target.value);
                    }}>
                    <option disabled>Pilih kategori</option>
                    <option value={1}>Alat</option>
                    <option value={2}>Bahan</option>
                  </select>
                </div>
                <div className="relative mb-2">
                  <input
                    type="text"
                    onChange={handleChange}
                    value={barangKeywords}
                    defaultValue={dataPeminjamanById?.barang?.nama_barang}
                    className="p-3 text-xs border-2 border-blue-200 w-full rounded-md focus:outline-none"
                    placeholder="cari bahan"
                  />
                  <button
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                    className="p-1 bg-zinc-200 rounded-sm absolute right-2 top-1/2 -translate-y-1/2">
                    {isSelectOpen ? <ArrowDropUp /> : <ArrowDropDown />}
                  </button>
                </div>
                <div
                  className={`${
                    isSelectOpen ? "flex" : "hidden"
                  } flex-col items-start h-full max-h-[15rem] overflow-y-auto p-2 shadow-md mb-4`}>
                  {dataBarang?.data?.length > 0 ? (
                    dataBarang?.data?.map((values) => {
                      const { id, kode_barang, nama_barang, stok_tersedia } = values;

                      const regex = new RegExp(`(${barangKeywords})`, "gi");
                      const searchedKode = kode_barang.replace(regex, (match) => `<td><b>${match}</b></td>`);
                      const searchedNama = nama_barang.replace(regex, (match) => `<td><b>${match}</b></td>`);

                      return (
                        <button
                          key={id}
                          onClick={() => handleNewBarang(values)}
                          disabled={stok_tersedia == 0 ? true : false}
                          className="py-2 px-3 w-full rounded-sm flex justify-between items-center text-start disabled:bg-zinc-400 disabled:hover:bg-zinc-400 disabled:text-zinc-300 bg-zinc-100 hover:bg-zinc-200 transition-colors duration-150 mb-1 text-xs">
                          <div className="flex justify-start items-center">
                            <p className="mr-3" dangerouslySetInnerHTML={{ __html: searchedKode }}></p>
                            <p dangerouslySetInnerHTML={{ __html: searchedNama }}></p>
                          </div>
                          <p className={stok_tersedia == 0 ? "text-red-700" : "text-zinc-700"}>
                            {stok_tersedia == 0 ? "Stok Habis" : stok_tersedia}
                          </p>
                        </button>
                      );
                    })
                  ) : (
                    <div>
                      <p className="text-center text-xs">
                        {kategoriBarang === 1 ? "Alat tidak ditemukan" : "Bahan tidak ditemukan!"}
                      </p>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <FormField formName="jumlah_peminjaman" formType="text" labelText="Jumlah Peminjaman" />
                </div>
                <div className="mb-6">
                  <FormField formName="keterangan" formType="text" labelText="Keterangan" />
                </div>

                <button
                  disabled={!isValid}
                  type="submit"
                  className="disabled:bg-zinc-500 disabled:hover:bg-zinc-500 w-1/2 py-3 px-5 text-xs leading-none rounded-sm bg-main hover:bg-main-hover transition-colors duration-150 text-white">
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Dialog>
  );
};

EditPeminjamanDialog.propTypes = {
  idPeminjaman: PropTypes.any,
  openEditPeminjamanDialog: PropTypes.any,
  setOpenPeminjamanDialog: PropTypes.any,
};

export default EditPeminjamanDialog;
