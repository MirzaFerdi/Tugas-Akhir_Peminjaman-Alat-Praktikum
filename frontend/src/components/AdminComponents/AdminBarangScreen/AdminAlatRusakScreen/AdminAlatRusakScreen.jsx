import React from "react";
import { ErrorOutline, ExpandMore, OpenInNew, Search } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Tooltip } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";
import { date, time } from "../../../../utils/datetime";
import { mahasiswaIcon } from "../../../../assets";

const AdminAlatRusakScreen = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1439px)" });

  const { data: dataKondisiBarang } = useFetchOnMount({
    url: `/kondisibarang`,
    method: "GET",
  });

  return (
    <React.Fragment>
      <div className="flex justify-between items-center px-4 lg:px-8 py-2 lg:py-4 bg-main shadow-sm shadow-main mx-6 lg:mx-8 rounded-xl text-white -mb-5 lg:-mb-10 relative">
        <h1 className="text-sm lg:text-2xl tracking-wide font-bold leading-none mr-4">Detail Alat Rusak</h1>
        <Tooltip
          arrow
          placement="bottom-start"
          title="Berikut ini merupakan data alat praktikum lab bengkel TRO dengan keadaan yang rusak.">
          <button className="p-1 w-fit h-fit bg-white flex items-center transition-colors duration-150 leading-none text-blue-600 hover:text-blue-700 rounded-full">
            <ErrorOutline fontSize="small" />
          </button>
        </Tooltip>
      </div>
      <div className="pb-5 pt-10 lg:pt-16 bg-white px-8 rounded-md shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start mb-8">
          <div className="flex flex-col lg:items-start mb-3 lg:mb-0">
            <p className="text-md tracking-wide text-center lg:text-start">Tabel Data Peralatan Praktikum Rusak</p>
            <p className="text-sm tracking-wide text-zinc-500 text-center lg:text-start">Teknologi Rekayasa Otomotif</p>
          </div>
        </div>
        {isMobile ? (
          <div>
            {dataKondisiBarang?.length > 0 ? (
              dataKondisiBarang?.data?.map((values) => {
                const { id, user, barang, status, tanggal_peminjaman } = values;

                return (
                  <Accordion key={id}>
                    <AccordionSummary sx={{ px: 1 }} expandIcon={<ExpandMore fontSize="smal" />}>
                      <p className="text-xs"></p>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 1 }}>
                      <table className="w-full">
                        <tbody>
                          <tr>
                            <th className="border p-2 lg:p-3 tracking-wide bg-blue-400 text-white font-medium leading-none text-start text-xs">
                              Data Mahasiwa
                            </th>
                            <td className="border p-2 lg:p-3 tracking-wide leading-none text-xs">
                              <p className="mb-1"></p>
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
                              <p className="text-zinc-500"></p>
                            </td>
                          </tr>
                          <tr>
                            <th className="border p-2 lg:p-3 tracking-wide bg-blue-400 text-white font-medium leading-none text-start text-xs">
                              Waktu & Tanggal
                            </th>
                            <td className="border p-2 lg:p-3 tracking-wide leading-none text-xs">
                              <p className="mb-1">{date(tanggal_peminjaman)}</p>
                              <p className="text-zinc-500">{time(tanggal_peminjaman)} wib</p>
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
                <p className="p-2 border text-xs text-center">{dataKondisiBarang?.message}</p>
              </div>
            )}
          </div>
        ) : (
          <table className="mb-3 w-full">
            <thead>
              <tr>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[43%]">
                  Data Mahasiswa
                </th>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[15%]">
                  Data Barang
                </th>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[15%]">
                  Jumlah Pengembalian
                </th>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[15%]">
                  Jumlah Habis / Rusak
                </th>
                <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[12%]">
                  Jumlah Kembali
                </th>
              </tr>
            </thead>
            <tbody>
              {dataKondisiBarang?.length > 0 ? (
                dataKondisiBarang?.map((values) => {
                  const { id, user, barang, pengembalian, jumlah_kondisi, kondisi_barang } = values;

                  return (
                    <tr key={id}>
                      <td className="border-b border-zinc-300 p-2">
                        <div className="w-full flex justify-start items-center">
                          <img
                            src={
                              user?.foto
                                ? `https://api.sipeminjam.indonesiadigitalsolutions.com/storage/foto/${user?.foto}`
                                : mahasiswaIcon
                            }
                            alt="Mahasiswa User Icon"
                            width={40}
                            height={40}
                            className="aspect-square mr-5 shadow-md hover:border-2 rounded-full p-1 cursor-pointer"
                          />
                          <div>
                            <p className="text-sm font-semibold">{user?.nama}</p>
                            <p className="text-xs tracking-wide text-zinc-400">
                              {user?.username} | Kelas {user?.kelas}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="border-b border-zinc-300 p-2">
                        <p className="text-sm font-semibold">{barang?.nama_barang}</p>
                        <p className="text-xs tracking-wide text-zinc-400">{barang?.kode_barang}</p>
                      </td>
                      <td className="border-b border-zinc-300 p-2">
                        <p className="text-sm font-semibold">{pengembalian?.jumlah_pengembalian}</p>
                      </td>
                      <td className="border-b border-zinc-300 p-2">
                        <p className="text-sm font-semibold">
                          {jumlah_kondisi} <span className="text-xs tracking-wide text-zinc-400">{kondisi_barang}</span>
                        </p>
                      </td>
                      <td className="border-b border-zinc-300 p-2">
                        <p className="text-sm font-semibold">
                          {parseInt(pengembalian?.jumlah_pengembalian) - parseInt(jumlah_kondisi)}
                        </p>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-2 border text-xs text-center">
                    Tidak ada request peminjaman terjadi!
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

export default AdminAlatRusakScreen;
