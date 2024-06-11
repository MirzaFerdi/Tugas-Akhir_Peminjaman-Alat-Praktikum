import { date, time } from "../../../../utils/datetime";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";
import React, { useCallback, useState } from "react";
import { ExpandMore, Search } from "@mui/icons-material";
import { toolsIcon } from "../../../../assets";
import { useMediaQuery } from "react-responsive";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import EditPeminjamanDialog from "./EditPeminjamanDialog";
import { useConfirmDialog } from "../../../../hooks/useDialog";
import { useAlert } from "../../../../hooks/useAlert";
import { useFetchOnClick } from "../../../../hooks/useFetchOnClick";

const MahasiswaDetailPeminjamanTable = () => {
  const [idPeminjaman, setIdPeminjaman] = useState("");
  const [openEditPeminjamanDialog, setOpenPeminjamanDialog] = useState(false);
  const [peminjamanKeywords, setPeminjamanKeywords] = useState("");

  const isMobile = useMediaQuery({ query: "(max-width: 1439px)" });
  const { userId } = JSON.parse(localStorage.getItem("user_payloads"));

  const { data: mahasiswaPeminjamanData } = useFetchOnMount({
    url: `/peminjaman/user/${userId}`,
    method: "GET",
  });
  const { fetchData: deletePeminjaman } = useFetchOnClick();

  const { openConfirmDialog } = useConfirmDialog();
  const { openAlertComponent } = useAlert();

  const handleEditPeminjaman = (id) => {
    setIdPeminjaman(id);
    setOpenPeminjamanDialog(true);
  };

  const handleDeletePeminjamanSuccessResponse = useCallback(
    (deletePeminjamanSuccessResponse) => {
      if (deletePeminjamanSuccessResponse?.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "Berhasil!",
          alertMessage: "Berhasil membatalkan peminjaman",
        });
      }
    },
    [openAlertComponent]
  );

  const handleDeletePeminjaman = (id) => {
    openConfirmDialog({
      title: "Batalkan Request Peminjaman",
      message: "Apakah anda yakin ingin membatalkan peminjaman tersebut?",
      okAction: () => {
        deletePeminjaman({
          url: `/peminjaman/${id}`,
          method: "DELETE",
          onSuccess: handleDeletePeminjamanSuccessResponse,
        });
      },
    });
  };

  return (
    <React.Fragment>
      <EditPeminjamanDialog
        idPeminjaman={idPeminjaman}
        openEditPeminjamanDialog={openEditPeminjamanDialog}
        setOpenPeminjamanDialog={setOpenPeminjamanDialog}
      />
      <div className="px-8 py-4 bg-main shadow-sm shadow-main mx-8 rounded-xl text-white -mb-5 lg:-mb-10 relative">
        <h1 className="text-center lg:text-start text-md lg:text-2xl tracking-wide font-bold leading-none mr-0 lg:mr-4">
          Detail Histori Peminjaman
        </h1>
      </div>
      <div className="pb-5 pt-8 lg:pt-16 bg-white px-8 rounded-md shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start mb-8">
          <div className="flex flex-col lg:items-start mb-3 lg:mb-0">
            <p className="text-md tracking-wide text-center lg:text-start">Tabel Histori Peminjaman</p>
            <p className="text-sm tracking-wide text-zinc-500 text-center lg:text-start">Alat dan Bahan Lab TRO</p>
          </div>
          <div className="flex justify-end relative">
            <input
              type="text"
              autoComplete="off"
              className="p-2 text-xs border-2 border-blue-300 rounded-sm w-full lg:w-1/2 leading-none tracking-wide hover:border-blue-400 focus:outline-none focus:border-blue-400"
              name="keywords"
              placeholder="cari peminjaman ..."
              onChange={(event) => {
                setPeminjamanKeywords(event.target.value);
              }}
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-2 text-blue-700">
              <Search />
            </button>
          </div>
        </div>

        {isMobile ? (
          <div>
            {mahasiswaPeminjamanData?.data?.data?.length > 0 ? (
              mahasiswaPeminjamanData?.data?.data?.map((values) => {
                const { id, barang, status, tanggal_peminjaman } = values;

                const regex = new RegExp(`(${peminjamanKeywords})`, "gi");
                const searchedBarang = barang?.nama_barang.replace(regex, (match) => `<td><b>${match}</b></td>`);

                return (
                  <Accordion key={id}>
                    <AccordionSummary sx={{ px: 1 }} expandIcon={<ExpandMore fontSize="smal" />}>
                      <p className="text-xs" dangerouslySetInnerHTML={{ __html: searchedBarang }}></p>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 1 }}>
                      <table className="w-full">
                        <tbody>
                          <tr>
                            <th className="border p-2 lg:p-3 tracking-wide bg-blue-400 text-white font-medium leading-none text-start text-xs">
                              Data Baranng
                            </th>
                            <td className="border p-2 lg:p-3 tracking-wide leading-none text-xs">
                              <p className="mb-2 font-bold" dangerouslySetInnerHTML={{ __html: searchedBarang }}></p>
                              <p>{barang?.kode_barang}</p>
                            </td>
                          </tr>
                          <tr>
                            <th className="border p-2 lg:p-3 tracking-wide bg-blue-400 text-white font-medium leading-none text-start text-xs">
                              Waktu & Tanggal
                            </th>
                            <td className="border p-2 lg:p-3 tracking-wide leading-none text-xs">
                              <p className="mb-2 font-medium">{date(tanggal_peminjaman)}</p>
                              <p>{time(tanggal_peminjaman)} wib</p>
                            </td>
                          </tr>
                          <tr>
                            <th className="border p-2 lg:p-3 tracking-wide bg-blue-400 text-white font-medium leading-none text-start text-xs">
                              Status
                            </th>
                            <td className="border p-2 lg:p-3 tracking-wide leading-none text-xs">
                              <p
                                className={`${
                                  status === "Pending" ? "bg-zinc-400" : "bg-green-400"
                                } text-xs text-white text-center py-2 px-5 rounded-full tracking-wide leading-none`}>
                                {status}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </AccordionDetails>
                  </Accordion>
                );
              })
            ) : (
              <div>
                <p className="p-2 border text-xs text-center">{mahasiswaPeminjamanData?.message}</p>
              </div>
            )}
          </div>
        ) : (
          <table className="mb-3 w-full">
            <thead>
              <tr>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[60%]">
                  Data Barang
                </th>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[20%]">
                  Jumlah Peminjaman
                </th>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[20%]">
                  Waktu & Tanggal
                </th>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-center font-medium text-zinc-400 w-[10%]">
                  Status
                </th>
                <th
                  colSpan={2}
                  className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-center font-medium text-zinc-400 w-[10%]">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {mahasiswaPeminjamanData?.data?.data?.length > 0 ? (
                mahasiswaPeminjamanData?.data?.data?.map((values) => {
                  const { id, barang, status, tanggal_peminjaman, jumlah_peminjaman } = values;

                  const regex = new RegExp(`(${peminjamanKeywords})`, "gi");
                  const searchedBarang = barang?.nama_barang.replace(regex, (match) => `<td><b>${match}</b></td>`);

                  return (
                    <tr key={id}>
                      <td className="border-b border-zinc-300 p-2">
                        <div className="w-full flex justify-start items-center">
                          <img
                            src={toolsIcon}
                            alt="Barang Praktikum Icon"
                            width={36}
                            height={36}
                            className="aspect-square mr-5"
                          />
                          <div>
                            <p
                              className="text-sm font-semibold"
                              dangerouslySetInnerHTML={{ __html: searchedBarang }}></p>
                            <p className="text-xs tracking-wide text-zinc-400">{barang?.kode_barang}</p>
                          </div>
                        </div>
                      </td>
                      <td className="border-b border-zinc-300 p-2">
                        <p className="text-sm font-semibold">{jumlah_peminjaman}</p>
                      </td>
                      <td className="border-b border-zinc-300 p-2">
                        <p className="text-sm font-semibold">{date(tanggal_peminjaman)}</p>
                        <p className="text-xs tracking-wide text-zinc-400">{time(tanggal_peminjaman)} wib</p>
                      </td>
                      <td className=" border-b border-zinc-300 p-2">
                        <p
                          className={`${
                            status === "Pending" ? "bg-zinc-400" : "bg-green-400"
                          } text-xs text-white text-center py-2 px-5 rounded-full tracking-wide leading-none`}>
                          {status}
                        </p>
                      </td>
                      <td className="text-center border-b border-zinc-300 p-2">
                        <button
                          onClick={() => handleEditPeminjaman(id)}
                          disabled={status === "Pending" ? false : true}
                          className="disabled:bg-zinc-400 bg-amber-400 hover:bg-amber-500 transition-colors duration-150 text-xs text-white text-center py-2 px-5 rounded-full tracking-wide leading-none">
                          Edit
                        </button>
                      </td>
                      <td className="text-center border-b border-zinc-300 p-2">
                        <button
                          onClick={() => handleDeletePeminjaman(id)}
                          disabled={status === "Pending" ? false : true}
                          className="disabled:bg-zinc-400 bg-red-400 hover:bg-red-500 transition-colors duration-150 text-xs text-white text-center py-2 px-5 rounded-full tracking-wide leading-none">
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-2 border text-xs text-center">
                    Tidak ada barang dipinjam yang telah disetujui!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </React.Fragment>
  );
};

export default MahasiswaDetailPeminjamanTable;
