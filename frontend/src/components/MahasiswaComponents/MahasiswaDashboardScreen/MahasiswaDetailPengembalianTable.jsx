import { date, time } from "../../../utils/datetime";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";
import { useState } from "react";
import { ExpandMore, Search } from "@mui/icons-material";
import { toolsIcon } from "../../../assets";
import { useMediaQuery } from "react-responsive";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

const MahasiswaDetailPengembalianTable = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1439px)" });
  const userPayloads = JSON.parse(localStorage.getItem("user_payloads"));

  const [pengembalianKeywords, setPengembalianKeywords] = useState("");

  const { data: mahasiswaPengembalianData } = useFetchOnMount({
    url: `/pengembalian/user/${userPayloads?.user?.id}`,
    method: "GET",
  });

  return (
    <div>
      <div className="px-8 py-4 bg-main shadow-sm shadow-main mx-8 rounded-xl text-white -mb-5 lg:-mb-10 relative">
        <h1 className="text-center lg:text-start text-md lg:text-2xl tracking-wide font-bold leading-none mr-0 lg:mr-4">
          Detail Histori Pengembalian
        </h1>
      </div>
      <div className="pb-5 pt-8 lg:pt-16 bg-white px-8 rounded-md shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start mb-8">
          <div className="flex flex-col lg:items-start mb-3 lg:mb-0">
            <p className="text-md tracking-wide text-center lg:text-start">Tabel Histori Pengembalian</p>
            <p className="text-sm tracking-wide text-zinc-500 text-center lg:text-start">Alat dan Bahan Lab TRO</p>
          </div>
          <div className="flex justify-end relative">
            <input
              type="text"
              autoComplete="off"
              className="p-2 text-xs border-2 border-blue-300 rounded-sm w-full lg:w-1/2 leading-none tracking-wide hover:border-blue-400 focus:outline-none focus:border-blue-400"
              name="keywords"
              placeholder="cari pengembalian ..."
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
            {mahasiswaPengembalianData?.data?.data?.length > 0 ? (
              mahasiswaPengembalianData?.data?.data?.map((values) => {
                const { id, barang, status, tanggal_pengembalian } = values;

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
                              <p className="mb-2 font-medium">{date(tanggal_pengembalian)}</p>
                              <p>{time(tanggal_pengembalian)} wib</p>
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
                <p className="p-2 border text-xs text-center">{mahasiswaPengembalianData?.message}</p>
              </div>
            )}
          </div>
        ) : (
          <table className="mb-3 w-full">
            <thead>
              <tr>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[70%]">
                  Data Barang
                </th>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[20%]">
                  Waktu & Tanggal
                </th>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-center font-medium text-zinc-400 w-[10%]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {mahasiswaPengembalianData?.data?.data?.length > 0 ? (
                mahasiswaPengembalianData?.data?.data?.map((values) => {
                  const { id, barang, status, tanggal_pengembalian } = values;

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
                        <p className="text-sm font-semibold">{date(tanggal_pengembalian)}</p>
                        <p className="text-xs tracking-wide text-zinc-400">{time(tanggal_pengembalian)} wib</p>
                      </td>
                      <td className=" border-b border-zinc-300 p-2">
                        <p
                          className={`${
                            status === "Pending" ? "bg-zinc-400" : "bg-green-400"
                          } text-xs text-white text-center py-2 px-5 rounded-full tracking-wide leading-none`}>
                          {status}
                        </p>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-2 border text-xs text-center">
                    {mahasiswaPengembalianData.message || "Tidak ada barang dikembalikan yang telah disetujui!"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MahasiswaDetailPengembalianTable;
