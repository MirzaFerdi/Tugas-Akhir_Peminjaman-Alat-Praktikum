import { AddCircleOutline, Delete, Edit, ErrorOutline, Search } from "@mui/icons-material";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";
import {
  useAdminAddMahasiswaDialog,
  useAdminEditMahasiswaDialog,
  useAdminKelasInformationDialog,
  useConfirmDialog,
} from "../../../../hooks/useDialog";
import { useAlert } from "../../../../hooks/useAlert";
import { useFetchOnClick } from "../../../../hooks/useFetchOnClick";
import { useCallback, useState } from "react";
import { mahasiswaIcon } from "../../../../assets";

const Kelas4TableData = () => {
  const [keywords, setKeywords] = useState("");

  const { openAddMahasiswaDialog } = useAdminAddMahasiswaDialog();
  const { openConfirmDialog, closeConfirmDialog } = useConfirmDialog();
  const { openAlertComponent, closeAlertComponent } = useAlert();
  const { openEditMahasiswaDialog } = useAdminEditMahasiswaDialog();
  const { openKelasInformationDialog } = useAdminKelasInformationDialog();

  const { fetchData: getDataMahasiswaById } = useFetchOnClick();
  const { fetchData: deleteMahasiswa } = useFetchOnClick();
  const { data: dataMahasiswaKelas4OnSearch } = useFetchOnMount({
    url: keywords === "" ? `/user/kelas/4` : `/user/search/mahasiswa/4/${keywords}`,
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

        setTimeout(() => {
          closeAlertComponent();
          closeConfirmDialog();
          window.location.reload();
        }, 2000);
      }
    },
    [closeAlertComponent, closeConfirmDialog, openAlertComponent]
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
    <div className="py-8 bg-white px-5 rounded-md shadow-md">
      <div className="grid grid-cols-2 items-end mb-8">
        <div className="flex flex-col lg:items-start mb-3 lg:mb-0">
          <p className="text-md tracking-wide text-center lg:text-start">Tabel Data Mahasiswa Kelas 4</p>
          <p className="text-sm tracking-wide text-zinc-500 text-center lg:text-start">Teknologi Rekayasa Otomotif</p>
          <button
            onClick={() => openKelasInformationDialog()}
            className="w-1/2 flex items-center transition-colors duration-150 py-2 rounded-sm text-blue-400">
            <p className="text-xs tracking-wide mr-2">Lihat Informasi Kelas 4</p> <ErrorOutline fontSize="small" />
          </button>
        </div>
        <div className="flex justify-end relative">
          <input
            type="text"
            autoComplete="off"
            className="p-2 text-xs border-2 border-blue-300 rounded-sm w-2/3 lg:w-1/2 leading-none tracking-wide hover:border-blue-400 focus:outline-none focus:border-blue-400"
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
      <table className="mb-12 w-full">
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
          {dataMahasiswaKelas4OnSearch?.data?.length > 0 ? (
            dataMahasiswaKelas4OnSearch?.data?.map((values) => {
              const { id, nama, email, username, nohp } = values;

              return (
                <tr key={id}>
                  <td className="border-b border-zinc-300 p-2">
                    <div className="w-full flex justify-start items-center">
                      <img
                        src={mahasiswaIcon}
                        alt="Mahasiswa User Icon"
                        width={40}
                        height={40}
                        className="aspect-square mr-5"
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
              <td colSpan={7} className="p-2 border text-xs text-center">
                {dataMahasiswaKelas4OnSearch?.message}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button
        onClick={() => openAddMahasiswaDialog()}
        className="mt-5 flex items-center bg-blue-400 hover:bg-blue-500 transition-all duration-100 py-2 px-5 rounded-sm text-white">
        <p className="text-xs tracking-wide mr-2">Tambah Data Mahasiswa Kelas 4</p>{" "}
        <AddCircleOutline fontSize="small" />
      </button>
    </div>
  );
};

export default Kelas4TableData;
