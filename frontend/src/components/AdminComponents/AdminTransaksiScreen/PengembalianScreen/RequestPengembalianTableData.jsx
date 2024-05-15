import React, { useCallback, useState } from "react";
import { ErrorOutline, ExpandMore, OpenInNew, Search } from "@mui/icons-material";
import { date, time } from "../../../../utils/datetime";
import { useAdminTransaksiDialog, useAdminTransaksiInformationDialog } from "../../../../hooks/useDialog";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";
import { mahasiswaIcon } from "../../../../assets";
import { useFetchOnClick } from "../../../../hooks/useFetchOnClick";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useMediaQuery } from "react-responsive";

const RequestPengembalianTableData = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1439px)" });

  const [transaksiPengembalianKeywords, setTransaksiPengembalianKeywords] = useState("");

  const { openTransaksiDialog } = useAdminTransaksiDialog();
  const { openTransaksiInformationDialog } = useAdminTransaksiInformationDialog();

  const { fetchData: dataPengembalianById } = useFetchOnClick();
  const { data: dataTransaksiPengembalian } = useFetchOnMount({
    url: transaksiPengembalianKeywords === "" ? "/pengembalian" : `/pengembalian/search/${transaksiPengembalianKeywords}`,
    method: "GET",
  });

  const handleGetDataPengembalianByIdSuccessResponse = useCallback(
    (getDataPengembalianByIdSuccessResponse) => {
      openTransaksiDialog(getDataPengembalianByIdSuccessResponse);
    },
    [openTransaksiDialog]
  );

  const handleGetDataPengembalianByIdErrorResponse = useCallback((getDataPengembalianByIdErrorResponse) => {
    console.log(getDataPengembalianByIdErrorResponse);
  }, []);

  return (
    <React.Fragment>
      <div className="flex justify-center lg:justify-start items-center px-8 py-4 bg-main shadow-sm shadow-main mx-8 rounded-xl text-white -mb-5 lg:-mb-10 relative">
        <h1 className="text-md lg:text-2xl tracking-wide font-bold leading-none mr-4">Request Pengembalian</h1>
        <button
          onClick={() => openTransaksiInformationDialog()}
          className="p-1 w-fit h-fit bg-white flex items-center transition-colors duration-150 leading-none text-blue-600 hover:text-blue-700 rounded-full">
          <ErrorOutline />
        </button>
      </div>
      <div className="pb-5 pt-8 lg:pt-16 bg-white px-8 rounded-md shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start mb-8">
          <div className="flex flex-col lg:items-start mb-3 lg:mb-0">
            <p className="text-md tracking-wide text-center lg:text-start">Tabel Data Request Pengembalian</p>
            <p className="text-sm tracking-wide text-zinc-500 text-center lg:text-start">Alat dan Bahan Lab TRO</p>
          </div>
          <div className="flex justify-center lg:justify-end relative">
            <input
              type="text"
              autoComplete="off"
              className="p-2 text-xs border-2 border-blue-300 rounded-sm w-full lg:w-1/2 leading-none tracking-wide hover:border-blue-400 focus:outline-none focus:border-blue-400"
              name="keywords"
              placeholder="cari request pengembalian"
              onChange={(event) => {
                setTransaksiPengembalianKeywords(event.target.value);
              }}
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-2 text-blue-700">
              <Search />
            </button>
          </div>
        </div>
        {isMobile ? (
          <div>
            {dataTransaksiPengembalian?.data?.length > 0 ? (
              dataTransaksiPengembalian?.data?.map((values) => {
                const { id, user, barang, status, tanggal_pengembalian } = values;

                const regex = new RegExp(`(${transaksiPengembalianKeywords})`, "gi");
                const searchedNama = user?.nama?.replace(regex, (match) => `<td><b>${match}</b></td>`);
                const searchedBarang = barang?.nama_barang.replace(regex, (match) => `<td><b>${match}</b></td>`);

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
                              Data Mahasiwa
                            </th>
                            <td className="border p-2 lg:p-3 tracking-wide leading-none text-xs">
                              <p className="mb-1" dangerouslySetInnerHTML={{ __html: searchedNama }}></p>
                              <p className="text-zinc-500">
                                Kelas {user?.kelas_id} | {user?.username}
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <th className="border p-2 lg:p-3 tracking-wide bg-blue-400 text-white font-medium leading-none text-start text-xs">
                              Data Barang
                            </th>
                            <td className="border p-2 lg:p-3 tracking-wide leading-none text-xs">
                              <p className="mb-1">{barang?.kode_barang}</p>
                              <p className="text-zinc-500" dangerouslySetInnerHTML={{ __html: searchedBarang }}></p>
                            </td>
                          </tr>
                          <tr>
                            <th className="border p-2 lg:p-3 tracking-wide bg-blue-400 text-white font-medium leading-none text-start text-xs">
                              Waktu & Tanggal
                            </th>
                            <td className="border p-2 lg:p-3 tracking-wide leading-none text-xs">
                              <p className="mb-1">{date(tanggal_pengembalian)}</p>
                              <p className="text-zinc-500">{time(tanggal_pengembalian)} wib</p>
                            </td>
                          </tr>
                          <tr>
                            <th className="border p-2 lg:p-3 tracking-wide bg-blue-400 text-white font-medium leading-none text-start text-xs">
                              Status
                            </th>
                            <td className="border p-2 lg:p-3 tracking-wide leading-none text-xs">
                              <p
                                className={`${
                                  status === "Diterima"
                                    ? "bg-green-500"
                                    : status === "Ditolak"
                                    ? "bg-red-400"
                                    : "bg-zinc-400"
                                } p-2 text-white text-xs rounded-full text-center`}>
                                {status}
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <th className="border p-2 lg:p-3 tracking-wide bg-blue-400 text-white font-medium leading-none text-start text-xs">
                              Aksi
                            </th>
                            <td className="border p-2 lg:p-3 tracking-wide leading-none text-xs">
                              <button
                                disabled={status === "Pending" ? false : true}
                                onClick={() =>
                                  dataPengembalianById({
                                    url: `/pengembalian/${id}`,
                                    method: "GET",
                                    onSuccess: handleGetDataPengembalianByIdSuccessResponse,
                                    onError: handleGetDataPengembalianByIdErrorResponse,
                                  })
                                }
                                className="disabled:bg-zinc-400 disabled:hover:bg-zinc-400 text-xs w-full flex justify-center items-center py-2 px-5 bg-main hover:bg-main-hover transition-colors duration-150 rounded-full text-white">
                                <OpenInNew sx={{ fontSize: "1.4em" }} className="mr-3" />{" "}
                                <p className="leading-none">Detail</p>
                              </button>
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
                <p className="p-2 border text-xs text-center">{dataTransaksiPengembalian?.message}</p>
              </div>
            )}
          </div>
        ) : (
          <table className="mb-3 w-full">
            <thead>
              <tr>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[40%]">
                  Data Mahasiswa
                </th>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[10%]">
                  Data Barang
                </th>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[20%]">
                  Waktu & Tanggal
                </th>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-center font-medium text-zinc-400 w-[10%]">
                  Status
                </th>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-center font-medium text-zinc-400 w-[10%]">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {dataTransaksiPengembalian?.data?.length > 0 ? (
                dataTransaksiPengembalian?.data?.map((values) => {
                  const { id, user, barang, status, tanggal_pengembalian } = values;

                  const regex = new RegExp(`(${transaksiPengembalianKeywords})`, "gi");
                  const searchedNama = user?.nama?.replace(regex, (match) => `<td><b>${match}</b></td>`);
                  const searchedBarang = barang?.nama_barang.replace(regex, (match) => `<td><b>${match}</b></td>`);

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
                            <p className="text-sm font-semibold" dangerouslySetInnerHTML={{ __html: searchedNama }}></p>
                            <p className="text-xs tracking-wide text-zinc-400">
                              Kelas {user?.kelas_id} | {user?.username}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="border-b border-zinc-300 p-2">
                        <p className="text-sm font-semibold">{barang?.kode_barang}</p>
                        <p
                          className="text-xs tracking-wide text-zinc-400"
                          dangerouslySetInnerHTML={{ __html: searchedBarang }}></p>
                      </td>
                      <td className="border-b border-zinc-300 p-2">
                        <p className="text-sm font-semibold">{date(tanggal_pengembalian)}</p>
                        <p className="text-xs tracking-wide text-zinc-400">{time(tanggal_pengembalian)} wib</p>
                      </td>
                      <td className="border-b border-zinc-300 p-2">
                        <p
                          className={`${
                            status === "Diterima" ? "bg-green-500" : status === "Ditolak" ? "bg-red-400" : "bg-zinc-400"
                          } p-2 text-white text-xs rounded-full text-center`}>
                          {status}
                        </p>
                      </td>
                      <td className="border-b border-zinc-300 p-2 w-fit">
                        <button
                          disabled={status === "Pending" ? false : true}
                          onClick={() =>
                            dataPengembalianById({
                              url: `/Pengembalian/${id}`,
                              method: "GET",
                              onSuccess: handleGetDataPengembalianByIdSuccessResponse,
                              onError: handleGetDataPengembalianByIdErrorResponse,
                            })
                          }
                          className="disabled:bg-zinc-400 disabled:hover:bg-zinc-400 text-xs w-full flex justify-center items-center py-2 px-5 bg-main hover:bg-main-hover transition-colors duration-150 rounded-full text-white">
                          <OpenInNew sx={{ fontSize: "1.4em" }} className="mr-3" />{" "}
                          <p className="leading-none">Detail</p>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-2 border text-xs text-center">
                    {dataTransaksiPengembalian?.message}
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

export default RequestPengembalianTableData;
