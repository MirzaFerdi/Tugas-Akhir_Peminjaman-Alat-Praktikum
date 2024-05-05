import { Pagination } from "@mui/material";
import { mahasiswaPeminjamanTableHeader } from "../../../constants/mahasiswa-peminjaman-table-header";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import MahasiswaPeminjamanDialog from "./MahasiswaPeminjamanDialog";
import { useMahasiswaPeminjamanDialog } from "../../../hooks/useDialog";

const MahasiswaPeminjamanScreen = () => {
  const [alatCurrentPagePagination, setAlatCurrentPagePagination] = useState(1);
  const [bahanCurrentPagePagination, setBahanCurrentPagePagination] = useState(1);

  const { data: alatPraktikumPayloads } = useFetchOnMount({
    url: `/barang/pagination/alat/8?page=${alatCurrentPagePagination}`,
    method: "GET",
  });

  const { data: bahanPraktikumPayloads } = useFetchOnMount({
    url: `/barang/pagination/bahan/8?page=${bahanCurrentPagePagination}`,
    method: "GET",
  });

  const handleChangeAlatPagination = (event, value) => {
    setAlatCurrentPagePagination(value);
  };

  const handleChangeBahanPagination = (event, value) => {
    setBahanCurrentPagePagination(value);
  };

  const { openMahasiswaPeminjamanDialog } = useMahasiswaPeminjamanDialog();

  return (
    <div className="grid grid-cols-2 gap-8">
      <MahasiswaPeminjamanDialog />
      <div className="border-r-2 pr-8">
        <div className="flex justify-between items-center mb-3 shadow-md p-2 rounded-sm">
          <p className="text-sm text-zinc-400 tracking-wider w-full">Alat Praktikum Tersedia</p>
          <div className="flex justify-center lg:justify-end relative w-full">
            <input
              type="text"
              autoComplete="off"
              className="p-2 text-xs border-2 border-blue-300 rounded-sm w-full lg:w-3/4 leading-none tracking-wide hover:border-blue-400 focus:outline-none focus:border-blue-400"
              name="keywords"
              placeholder="cari alat praktikum"
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-2 text-blue-700">
              <Search />
            </button>
          </div>
        </div>
        <table className="w-full mb-2">
          <thead>
            <tr>
              {mahasiswaPeminjamanTableHeader.map((headerRows) => {
                const { id, row, width } = headerRows;

                return (
                  <th
                    key={id}
                    className={`${
                      id == 2 ? "text-start" : "text-center"
                    } border p-2 text-xs text-white bg-blue-400 tracking-wider font-semibold w-[${width}]`}>
                    {row}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {alatPraktikumPayloads?.data?.map((values, index) => {
              const { id, nama_barang, stok_tersedia } = values;

              return (
                <tr key={id}>
                  <td className="w-fit border bg-zinc-50 p-2   text-xs text-zinc-600 text-center">{index + 1}</td>
                  <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-left">{nama_barang}</td>
                  <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-center tracking-wide">
                    {parseInt(stok_tersedia) === 0 ? "Stok Habis" : parseInt(stok_tersedia)}
                  </td>
                  <td className="w-fit border bg-zinc-50 p-2 text-xs text-center">
                    <button
                      disabled={parseInt(stok_tersedia) === 0 ? true : false}
                      onClick={() => openMahasiswaPeminjamanDialog(id)}
                      className={`${
                        parseInt(stok_tersedia) === 0
                          ? "bg-zinc-300 text-zinc-500"
                          : "bg-blue-200 hover:bg-blue-300 text-zinc-600 hover:text-zinc-800"
                      } font-medium tracking-wide p-2 transition-colors duration-100 rounded-md w-full`}>
                      Pinjam
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-between items-center shadow-md p-2 rounded-sm">
          <p className="text-xs tracking-wide text-zinc-400">Paginasi Alat Praktikum</p>
          <Pagination
            count={alatPraktikumPayloads?.last_page}
            shape="rounded"
            color="primary"
            variant="outlined"
            onChange={handleChangeAlatPagination}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-3 bg-white p-2 rounded-sm shadow-md">
          <p className="text-sm text-zinc-400 tracking-wider w-full">Bahan Praktikum Tersedia</p>
          <div className="flex justify-center lg:justify-end relative w-full">
            <input
              type="text"
              autoComplete="off"
              className="p-2 text-xs border-2 border-green-200 rounded-sm w-full lg:w-3/4 leading-none tracking-wide hover:border-green-300 focus:outline-none focus:border-green-300"
              name="keywords"
              placeholder="cari bahan praktikum"
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-2 text-green-700">
              <Search />
            </button>
          </div>
        </div>
        <table className="w-full mb-2">
          <thead>
            <tr>
              {mahasiswaPeminjamanTableHeader.map((headerRows) => {
                const { id, row, width } = headerRows;

                return (
                  <th
                    key={id}
                    className={`${
                      id == 2 ? "text-start" : "text-center"
                    } border p-2 text-xs text-white bg-green-700 tracking-wider font-semibold w-[${width}]`}>
                    {row}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {bahanPraktikumPayloads?.data?.map((values, index) => {
              const { id, nama_barang, stok_tersedia } = values;

              return (
                <tr key={id}>
                  <td className="w-fit border bg-zinc-50 p-2   text-xs text-zinc-600 text-center">{index + 1}</td>
                  <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-left">{nama_barang}</td>
                  <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-center tracking-wide">
                    {parseInt(stok_tersedia) === 0 ? "Stok Habis" : parseInt(stok_tersedia)}
                  </td>
                  <td className="w-fit border bg-zinc-50 p-2 text-xs text-center">
                    <button
                      disabled={parseInt(stok_tersedia) === 0 ? true : false}
                      // onClick={() => handlePeminjaman(id)}
                      className={`${
                        parseInt(stok_tersedia) === 0
                          ? "bg-zinc-300 text-zinc-500"
                          : "bg-green-100 hover:bg-green-200 text-zinc-600 hover:text-zinc-800"
                      } font-medium tracking-wide p-2 transition-colors duration-100 rounded-md w-full`}>
                      Pinjam
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-between items-center shadow-md p-2 rounded-md">
          <p className="text-xs tracking-wide text-zinc-400">Paginasi Bahan Praktikum</p>
          <Pagination
            count={bahanPraktikumPayloads?.last_page}
            shape="rounded"
            color="primary"
            variant="outlined"
            onChange={handleChangeBahanPagination}
          />
        </div>
      </div>
    </div>
  );
};

export default MahasiswaPeminjamanScreen;
