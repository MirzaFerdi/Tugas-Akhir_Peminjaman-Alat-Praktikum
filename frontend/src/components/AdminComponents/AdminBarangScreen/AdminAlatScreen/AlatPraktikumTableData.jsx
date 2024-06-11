import PropTypes from "prop-types";
import { Delete, Edit, ErrorOutline, Search } from "@mui/icons-material";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";
import React, { useCallback, useState } from "react";
import {
  useAdminBarangInformationDialog,
  useAdminEditBarangDialog,
  useConfirmDialog,
} from "../../../../hooks/useDialog";
import { useFetchOnClick } from "../../../../hooks/useFetchOnClick";
import { useAlert } from "../../../../hooks/useAlert";
import { Tooltip } from "@mui/material";

const AlatPraktikumTableData = ({ paginationPage, setCount }) => {
  const [alatKeywords, setAlatKeywords] = useState("");

  const { openBarangInformationDialog } = useAdminBarangInformationDialog();
  const { openEditBarangDialog } = useAdminEditBarangDialog();
  const { openConfirmDialog } = useConfirmDialog();
  const { openAlertComponent } = useAlert();

  const handleSuccessDataAlatPraktikumResponse = useCallback(
    (dataAlatPraktikumSuccessResponse) => {
      setCount(dataAlatPraktikumSuccessResponse?.last_page);
    },
    [setCount]
  );

  const { data: dataAlatPraktikum } = useFetchOnMount({
    url: alatKeywords === "" ? `/barang/pagination/1/8?page=${paginationPage}` : `/barang/search/1/${alatKeywords}`,
    method: "GET",
    onSuccess: handleSuccessDataAlatPraktikumResponse,
  });
  const { fetchData: dataAlatById } = useFetchOnClick();
  const { fetchData: deleteDataAlat } = useFetchOnClick();

  const handleGetBarangByIdSuccessResponse = useCallback(
    (getBarangByIdSuccessResponse) => {
      openEditBarangDialog(getBarangByIdSuccessResponse);
    },
    [openEditBarangDialog]
  );

  const handleEditBarang = (selectedBarangId) => {
    dataAlatById({
      url: `/barang/${selectedBarangId}`,
      method: "GET",
      onSuccess: handleGetBarangByIdSuccessResponse,
    });
  };

  const handleDeleteAlatSuccessResponse = useCallback(
    (deleteAlatSuccessResponse) => {
      if (deleteAlatSuccessResponse?.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: deleteAlatSuccessResponse?.message,
        });
      }
    },
    [openAlertComponent]
  );

  const handleDeleteAlat = (selectedAlatId) => {
    openConfirmDialog({
      title: "Hapus Data Alat",
      message: "Apakah anda yakin ingin menghapus data alat tersebut?",
      okAction: () => {
        deleteDataAlat({
          url: `/barang/${selectedAlatId}`,
          method: "DELETE",
          onSuccess: handleDeleteAlatSuccessResponse,
        });
      },
    });
  };

  return (
    <React.Fragment>
      <div className="flex justify-between items-center px-4 lg:px-8 py-2 lg:py-4 bg-main shadow-sm shadow-main mx-6 lg:mx-8 rounded-xl text-white -mb-5 lg:-mb-10 relative">
        <h1 className="text-sm lg:text-2xl tracking-wide font-bold leading-none mr-4">Daftar Alat Praktikum</h1>
        <Tooltip arrow placement="bottom-start" title="Lihat detail data alat">
          <button
            onClick={() => openBarangInformationDialog()}
            className="p-1 w-fit h-fit bg-white flex items-center transition-colors duration-150 leading-none text-blue-600 hover:text-blue-700 rounded-full">
            <ErrorOutline fontSize="small" />
          </button>
        </Tooltip>
      </div>
      <div className="pb-5 pt-10 lg:pt-16 bg-white px-8 rounded-md shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start mb-8">
          <div className="flex flex-col lg:items-start mb-3 lg:mb-0">
            <p className="text-md tracking-wide text-center lg:text-start">Tabel Data Peralatan Praktikum</p>
            <p className="text-sm tracking-wide text-zinc-500 text-center lg:text-start">Teknologi Rekayasa Otomotif</p>
          </div>
          <div className="flex justify-end relative">
            <input
              type="text"
              autoComplete="off"
              className="p-2 text-xs border-2 border-blue-300 rounded-sm w-full lg:w-1/2 leading-none tracking-wide hover:border-blue-400 focus:outline-none focus:border-blue-400"
              name="keywords"
              placeholder="cari alat ..."
              onChange={(event) => {
                setAlatKeywords(event.target.value);
              }}
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-2 text-blue-700">
              <Search />
            </button>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr>
              <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-center font-medium text-zinc-400 w-[1%]">
                No
              </th>
              <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[8%]">
                Kode Alat
              </th>
              <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[42%]">
                Nama Alat
              </th>
              <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[15%]">
                Stok Awal
              </th>
              <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[15%]">
                Stok Tersedia
              </th>
              <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-center font-medium text-zinc-400 w-[7%]">
                Edit
              </th>
              <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-center font-medium text-zinc-400 w-[7%]">
                Hapus
              </th>
            </tr>
          </thead>
          <tbody>
            {dataAlatPraktikum?.data?.length > 0 ? (
              dataAlatPraktikum?.data?.map((payloads, index) => {
                const { id, kode_barang, nama_barang, stok_awal, stok_tersedia } = payloads;

                const regex = new RegExp(`(${alatKeywords})`, "gi");
                const searchedKodeAlat = kode_barang.replace(regex, (match) => `<td><b>${match}</b></td>`);
                const searchedNamaAlat = nama_barang.replace(regex, (match) => `<td><b>${match}</b></td>`);

                return (
                  <tr key={id}>
                    <td className="w-fit border-b border-zinc-300 p-2 text-xs text-zinc-600 text-center">{index + 1}</td>
                    <td
                      className="w-fit border-b border-zinc-300 p-2 text-xs text-zinc-600 text-left"
                      dangerouslySetInnerHTML={{ __html: searchedKodeAlat }}></td>
                    <td
                      className="w-fit border-b border-zinc-300 p-2 text-xs text-zinc-600 text-left"
                      dangerouslySetInnerHTML={{ __html: searchedNamaAlat }}></td>
                    <td className="w-fit border-b border-zinc-300 p-2 text-xs text-zinc-600 text-left">{stok_awal} Buah</td>
                    <td className="w-fit border-b border-zinc-300 p-2 text-xs text-zinc-600 text-left">{stok_tersedia} Buah</td>
                    <td className="w-fit border-b border-zinc-300 p-2 text-xs text-center">
                      <button onClick={() => handleEditBarang(id)} className="text-blue-400">
                        <Edit fontSize="small" />
                      </button>
                    </td>
                    <td className="w-fit border-b border-zinc-300 p-2 text-xs text-center">
                      <button onClick={() => handleDeleteAlat(id)} className="text-red-500">
                        <Delete fontSize="small" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="p-2 border text-xs text-center">
                  Alat tidak ditemukan!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

AlatPraktikumTableData.propTypes = {
  alatKeywords: PropTypes.string,
  barangKategori: PropTypes.any,
  paginationPage: PropTypes.any,
  setCount: PropTypes.func,
};

export default AlatPraktikumTableData;
