import React, { useState } from "react";
import MahasiswaPengembalianDialog from "./MahasiswaPengembalianDialog";
import { ExpandMore, OpenInNew, Search } from "@mui/icons-material";
import { date, time } from "../../../utils/datetime";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";
import { useMahasiswaPengembalianDialog } from "../../../hooks/useDialog";
import { toolsIcon } from "../../../assets";
import { useMediaQuery } from "react-responsive";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

const MahasiswaPengembalianScreen = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1439px)" });
  const userPayloads = JSON.parse(localStorage.getItem("user_payloads"));

  const [pengembalianKeywords, setPengembalianKeywords] = useState("");

  const { openMahasiswaPengembalianDialog } = useMahasiswaPengembalianDialog();
  const { data: dataApprovedPeminjaman } = useFetchOnMount({
    url:
      pengembalianKeywords === ""
        ? `/peminjaman/approved/${userPayloads?.user?.id}`
        : `/peminjaman/search/${pengembalianKeywords}`,
    method: "GET",
  });

  return (
    <React.Fragment>
      <MahasiswaPengembalianDialog />
      <div className="flex justify-start items-center px-8 py-4 bg-main shadow-sm shadow-main mx-8 rounded-xl text-white -mb-5 lg:-mb-10 relative">
        <h1 className="text-md lg:text-2xl tracking-wide font-bold leading-none mr-4">Pengembalian Barang</h1>
      </div>
      <div className="pb-5 pt-8 lg:pt-16 bg-white px-8 rounded-md shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start mb-8">
          <div className="flex flex-col lg:items-start mb-3 lg:mb-0">
            <p className="text-md tracking-wide text-center lg:text-start">Tabel Data Pengembalian</p>
            <p className="text-sm tracking-wide text-zinc-500 text-center lg:text-start">Alat dan Bahan Lab TRO</p>
          </div>
          <div className="flex justify-center lg:justify-end relative">
            <input
              type="text"
              autoComplete="off"
              className="p-2 text-xs border-2 border-blue-300 rounded-sm w-full lg:w-1/2 leading-none tracking-wide hover:border-blue-400 focus:outline-none focus:border-blue-400"
              name="keywords"
              placeholder="cari peminjaman diterima ..."
              onChange={(event) => {
                setPengembalianKeywords(event.target.value);
              }}
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-2 text-blue-700">
              <Search />
            </button>
          </div>
        </div>

        {isMobile ? (
          <div>
            {dataApprovedPeminjaman?.data?.data?.length > 0 ? (
              dataApprovedPeminjaman?.data?.data?.map((values) => {
                const { id, barang, status, pengembalian_id, pengembalian, tanggal_peminjaman } = values;

                const regex = new RegExp(`(${pengembalianKeywords})`, "gi");
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
                              <p>{time(tanggal_peminjaman)}</p>
                            </td>
                          </tr>
                          <tr>
                            <th className="border p-2 lg:p-3 tracking-wide bg-blue-400 text-white font-medium leading-none text-start text-xs">
                              Aksi
                            </th>
                            <td className="border p-2 lg:p-3 tracking-wide leading-none text-xs">
                              <button
                                disabled={
                                  pengembalian_id === null && status === "Pending"
                                    ? true
                                    : pengembalian_id !== null && pengembalian.status === "Pending"
                                    ? true
                                    : pengembalian_id !== null && pengembalian.status === "Diterima"
                                    ? true
                                    : false
                                }
                                onClick={() => openMahasiswaPengembalianDialog(values)}
                                className="disabled:bg-zinc-400 disabled:hover:bg-zinc-400 text-xs w-full flex justify-center items-center py-1 px-3 lg:px-5 bg-main hover:bg-main-hover transition-colors duration-150 rounded-full text-white">
                                {pengembalian_id === null && status === "Pending" ? (
                                  true
                                ) : pengembalian_id !== null && pengembalian.status === "Pending" ? (
                                  true
                                ) : pengembalian_id !== null && pengembalian.status === "Diterima" ? (
                                  true
                                ) : (
                                  <OpenInNew sx={{ fontSize: "1.4em" }} className="mr-3" />
                                )}
                                <p className="leading-none">
                                  {pengembalian_id === null && status === "Pending"
                                    ? "Menunggu persetujuan peminjaman!"
                                    : pengembalian_id !== null && pengembalian.status === "Pending"
                                    ? "Menunggu persetujuan pengembalian!"
                                    : pengembalian_id !== null && pengembalian.status === "Diterima"
                                    ? "Pengembalian diterima!"
                                    : "Kembalikan"}
                                </p>
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
                <p className="p-2 border text-xs text-center">{dataApprovedPeminjaman?.message}</p>
              </div>
            )}
          </div>
        ) : (
          <table className="mb-3 w-full table-fixed">
            <thead>
              <tr>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[50%]">
                  Data Barang
                </th>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[20%]">
                  Waktu & Tanggal
                </th>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-center font-medium text-zinc-400 w-[30%]">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {dataApprovedPeminjaman?.data?.data?.length > 0 ? (
                dataApprovedPeminjaman?.data?.data?.map((values) => {
                  const { id, barang, status, pengembalian_id, pengembalian, tanggal_peminjaman } = values;

                  const regex = new RegExp(`(${pengembalianKeywords})`, "gi");
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
                        <p className="text-sm font-semibold">{date(tanggal_peminjaman)}</p>
                        <p className="text-xs tracking-wide text-zinc-400">{time(tanggal_peminjaman)} wib</p>
                      </td>
                      <td className="border-b border-zinc-300 p-2 w-fit">
                        <button
                          disabled={
                            pengembalian_id === null && status === "Pending"
                              ? true
                              : pengembalian_id !== null && pengembalian.status === "Pending"
                              ? true
                              : pengembalian_id !== null && pengembalian.status === "Diterima"
                              ? true
                              : false
                          }
                          onClick={() => openMahasiswaPengembalianDialog(values)}
                          className="disabled:bg-zinc-400 disabled:hover:bg-zinc-400 text-xs w-full flex justify-center items-center py-2 px-5 bg-main hover:bg-main-hover transition-colors duration-150 rounded-full text-white">
                          {pengembalian_id === null && status === "Pending" ? (
                            true
                          ) : pengembalian_id !== null && pengembalian.status === "Pending" ? (
                            true
                          ) : pengembalian_id !== null && pengembalian.status === "Diterima" ? (
                            true
                          ) : (
                            <OpenInNew sx={{ fontSize: "1.4em" }} className="mr-3" />
                          )}
                          <p className="leading-none">
                            {pengembalian_id === null && status === "Pending"
                              ? "Menunggu persetujuan peminjaman!"
                              : pengembalian_id !== null && pengembalian.status === "Pending"
                              ? "Menunggu persetujuan pengembalian!"
                              : pengembalian_id !== null && pengembalian.status === "Diterima"
                              ? "Pengembalian diterima!"
                              : "Kembalikan"}
                          </p>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-2 border text-xs text-center">
                    {dataApprovedPeminjaman?.message || "Tidak ada barang dipinjam yang telah disetujui!"}
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

export default MahasiswaPengembalianScreen;
