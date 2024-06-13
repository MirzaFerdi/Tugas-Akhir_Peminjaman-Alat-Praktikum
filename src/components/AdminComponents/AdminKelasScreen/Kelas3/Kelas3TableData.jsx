import React, { useCallback, useState } from "react";
import { AddCircleOutline, Delete, Edit, ErrorOutline, ExpandMore, Search } from "@mui/icons-material";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";
import {
  useAdminAddMahasiswaDialog,
  useAdminEditMahasiswaDialog,
  useAdminKelasInformationDialog,
  useAdminPreviewPhotoDialog,
  useConfirmDialog,
} from "../../../../hooks/useDialog";
import { useAlert } from "../../../../hooks/useAlert";
import { useFetchOnClick } from "../../../../hooks/useFetchOnClick";
import { mahasiswaIcon } from "../../../../assets";
import { Accordion, AccordionDetails, AccordionSummary, Tooltip } from "@mui/material";
import { useMediaQuery } from "react-responsive";

const Kelas1TableData = () => {
  const [keywords, setKeywords] = useState("");

  const isMobile = useMediaQuery({ query: "(max-width: 1439px)" });

  const { openAddMahasiswaDialog } = useAdminAddMahasiswaDialog();
  const { openConfirmDialog } = useConfirmDialog();
  const { openAlertComponent } = useAlert();
  const { openEditMahasiswaDialog } = useAdminEditMahasiswaDialog();
  const { openKelasInformationDialog } = useAdminKelasInformationDialog();
  const { openPreviewPhoto } = useAdminPreviewPhotoDialog();

  const { fetchData: getDataMahasiswaById } = useFetchOnClick();
  const { fetchData: deleteMahasiswa } = useFetchOnClick();
  const { data: dataMahasiswaKelas3OnSearch } = useFetchOnMount({
    url: keywords === "" ? `/user/kelas/3` : `/user/search/mahasiswa/3/${keywords}`,
    method: "GET",
  });

  const handleSuccessGetMahasiswaById = useCallback(
    (mahasiswaDataById) => {
      openEditMahasiswaDialog(mahasiswaDataById);
    },
    [openEditMahasiswaDialog]
  );

  const handleEditMahasiswa = (selectedMahasiswaId) => {
    getDataMahasiswaById({
      url: `/user/${selectedMahasiswaId}`,
      method: "GET",
      onSuccess: handleSuccessGetMahasiswaById,
    });
  };

  const handleDeleteMahasiswaSuccessResponse = useCallback(
    (deleteMahasiswaSuccessResponse) => {
      if (deleteMahasiswaSuccessResponse.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: deleteMahasiswaSuccessResponse?.message,
        });
      }
    },
    [openAlertComponent]
  );

  const handleDeleteMahasiswa = (idMahasiswa) => {
    openConfirmDialog({
      title: "Hapus Data Mahasiswa",
      message: "Apakah anda yakin ingin menghapus data mahasiswa tersebut?",
      okAction: () => {
        deleteMahasiswa({
          url: `/user/${idMahasiswa}`,
          method: "DELETE",
          onSuccess: handleDeleteMahasiswaSuccessResponse,
        });
      },
    });
  };

  return (
    <React.Fragment>
      <div className="flex justify-between items-center px-4 lg:px-8 py-2 lg:py-4 bg-main shadow-sm shadow-main mx-6 lg:mx-8 rounded-xl text-white -mb-5 lg:-mb-10 relative">
        <h1 className="text-sm lg:text-2xl tracking-wide font-bold leading-none mr-4">Mahasiswa Kelas 3</h1>
        <Tooltip arrow placement="right" title="Detail Informasi Kelas">
          <button
            onClick={() => openKelasInformationDialog()}
            className="p-1 w-fit h-fit bg-white flex items-center transition-colors duration-150 leading-none text-blue-600 hover:text-blue-700 rounded-full">
            <ErrorOutline fontSize="small" />
          </button>
        </Tooltip>
      </div>
      <div className="pb-5 pt-10 lg:pt-16 bg-white px-8 rounded-md shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start mb-8">
          <div className="flex flex-col lg:items-start mb-3 lg:mb-0">
            <p className="text-md tracking-wide text-center lg:text-start">Tabel Data Mahasiswa Kelas 3</p>
            <p className="text-sm tracking-wide text-zinc-500 text-center lg:text-start">Teknologi Rekayasa Otomotif</p>
          </div>
          <div className="flex justify-end relative">
            <input
              type="text"
              autoComplete="off"
              className="p-2 text-xs border-2 border-blue-300 rounded-sm w-full lg:w-1/2 leading-none tracking-wide hover:border-blue-400 focus:outline-none focus:border-blue-400"
              name="keywords"
              placeholder={`cari mahasiswa ...`}
              onChange={(event) => {
                setKeywords(event.target.value);
              }}
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-2 text-blue-700">
              <Search />
            </button>
          </div>
        </div>
        {isMobile ? (
          <div>
            {dataMahasiswaKelas3OnSearch?.data?.length > 0 ? (
              dataMahasiswaKelas3OnSearch?.data?.map((payloads) => {
                const { id, nama, username, email, nohp } = payloads;

                const regex = new RegExp(`(${keywords})`, "gi");
                const searchedNama = nama.replace(regex, (match) => `<td><b>${match}</b></td>`);
                const searchedNim = username.replace(regex, (match) => `<td><b>${match}</b></td>`);
                const searchedEmail = email.replace(regex, (match) => `<td><b>${match}</b></td>`);

                return (
                  <Accordion key={id}>
                    <AccordionSummary sx={{ px: 1 }} expandIcon={<ExpandMore fontSize="smal" />}>
                      <p className="text-xs" dangerouslySetInnerHTML={{ __html: searchedNama }}></p>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 1 }}>
                      <table className="w-full">
                        <tbody>
                          <tr>
                            <th className="border p-2 lg:p-3 tracking-wide bg-blue-400 text-white font-medium leading-none text-start text-xs">
                              Nama
                            </th>
                            <td
                              className="border p-2 lg:p-3 tracking-wide leading-none text-xs"
                              dangerouslySetInnerHTML={{ __html: searchedNama }}></td>
                          </tr>
                          <tr>
                            <th className="border p-2 lg:p-3 tracking-wide bg-blue-400 text-white font-medium leading-none text-start text-xs">
                              NIM
                            </th>
                            <td
                              className="border p-2 lg:p-3 tracking-wide leading-none text-xs"
                              dangerouslySetInnerHTML={{ __html: searchedNim }}></td>
                          </tr>
                          <tr>
                            <th className="border p-2 lg:p-3 tracking-wide bg-blue-400 text-white font-medium leading-none text-start text-xs">
                              E-Mail
                            </th>
                            <td
                              className="border p-2 lg:p-3 tracking-wide leading-none text-xs"
                              dangerouslySetInnerHTML={{ __html: searchedEmail }}></td>
                          </tr>
                          <tr>
                            <th className="border p-2 lg:p-3 tracking-wide bg-blue-400 text-white font-medium leading-none text-start text-xs">
                              Nomor Telepon
                            </th>
                            <td className="border p-2 lg:p-3 tracking-wide leading-none text-xs">{nohp}</td>
                          </tr>
                        </tbody>
                      </table>
                    </AccordionDetails>
                  </Accordion>
                );
              })
            ) : (
              <div>
                <p className="p-2 text-xs text-center">
                  {dataMahasiswaKelas3OnSearch?.total === 0 && "Mahasiswa kelas 3 tidak ada!"}
                </p>
              </div>
            )}
          </div>
        ) : (
          <table className="mb-3 w-full">
            <thead>
              <tr>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[40%]">
                  Mahasiswa
                </th>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[10%]">
                  NIM
                </th>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[10%]">
                  Nomor Telepon
                </th>
                <th
                  colSpan={2}
                  className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-center font-medium text-zinc-400 w-[10%]">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {dataMahasiswaKelas3OnSearch?.data?.length > 0 ? (
                dataMahasiswaKelas3OnSearch?.data?.map((values) => {
                  const { id, nama, email, username, foto, nohp } = values;

                  return (
                    <tr key={id}>
                      <td className="border-b border-zinc-300 p-2">
                        <div className="w-full flex justify-start items-center">
                          <img
                            onClick={() =>
                              openPreviewPhoto(
                                `https://api.sipeminjam.indonesiadigitalsolutions.com/storage/foto/${foto}`
                              )
                            }
                            src={
                              foto
                                ? `https://api.sipeminjam.indonesiadigitalsolutions.com/storage/foto/${foto}`
                                : mahasiswaIcon
                            }
                            alt="Mahasiswa User Icon"
                            width={40}
                            height={40}
                            className="aspect-square mr-5 shadow-md hover:border-2 rounded-full p-1 cursor-pointer"
                          />
                          <div>
                            <p className="text-sm font-semibold">{nama}</p>
                            <p className="text-xs tracking-wide text-zinc-400">{email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="border-b border-zinc-300 text-xs p-2 w-fit">{username}</td>
                      <td className="border-b border-zinc-300 text-xs p-2 w-fit">{nohp}</td>
                      <td className="border-b border-zinc-300 p-2">
                        <button
                          onClick={() => handleEditMahasiswa(id)}
                          className="text-xs w-full flex justify-center items-center py-2 px-5 bg-main hover:bg-main-hover transition-colors duration-150 rounded-full text-white">
                          <Edit sx={{ fontSize: "1.4em" }} className="mr-3" /> <p className="leading-none">Edit</p>
                        </button>
                      </td>
                      <td className="border-b border-zinc-300 p-2 w-fit">
                        <button
                          onClick={() => handleDeleteMahasiswa(id)}
                          className="text-xs w-full flex justify-center items-center py-2 px-5 bg-red-400 hover:bg-red-500 transition-colors duration-150 rounded-full text-white">
                          <Delete sx={{ fontSize: "1.4em" }} className="mr-3" /> <p className="leading-none">Hapus</p>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="p-2 border text-xs text-center">
                    {dataMahasiswaKelas3OnSearch?.total === 0
                      ? "Mahasiswa kelas 3 tidak ada!"
                      : dataMahasiswaKelas3OnSearch?.message}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <button
          onClick={() => openAddMahasiswaDialog()}
          className="mt-5 flex items-center bg-blue-900 hover:bg-blue-950 transition-all duration-100 py-2 px-5 rounded-sm text-white">
          <p className="text-xs tracking-wide mr-2">Tambah Mahasiswa</p> <AddCircleOutline fontSize="small" />
        </button>
      </div>
    </React.Fragment>
  );
};

export default Kelas1TableData;
