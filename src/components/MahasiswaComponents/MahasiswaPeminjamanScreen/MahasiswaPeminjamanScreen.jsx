import { Pagination } from "@mui/material";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import MahasiswaPeminjamanDialog from "./MahasiswaPeminjamanDialog";
import { useMahasiswaPeminjamanDialog } from "../../../hooks/useDialog";

const MahasiswaPeminjamanScreen = () => {
  const [alatSearchKeywords, setAlatSearchKeywords] = useState("");
  const [bahanSearchKeywords, setBahanSearchKeywords] = useState("");
  const [alatCurrentPagePagination, setAlatCurrentPagePagination] = useState(1);
  const [bahanCurrentPagePagination, setBahanCurrentPagePagination] = useState(1);

  const { data: alatPraktikumPayloads } = useFetchOnMount({
    url: !alatSearchKeywords
      ? `/barang/pagination/1/8?page=${alatCurrentPagePagination}`
      : `/barang/search/1/${alatSearchKeywords}`,
    method: "GET",
  });

  const { data: bahanPraktikumPayloads } = useFetchOnMount({
    url: !bahanSearchKeywords
      ? `/barang/pagination/2/8?page=${bahanCurrentPagePagination}`
      : `/barang/search/2/${bahanSearchKeywords}`,
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <MahasiswaPeminjamanDialog />
      <div className="border-r-0 lg:border-r-2 lg:pr-8">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-3 shadow-md p-2 rounded-sm">
          <p className="text-center lg:text-left text-sm text-zinc-500 tracking-wider w-full mb-3 lg:mb-0 pl-2">
            Alat Praktikum Tersedia
          </p>
          <div className="flex justify-center lg:justify-end relative w-full">
            <input
              type="text"
              autoComplete="off"
              className="p-2 text-xs border-2 border-blue-300 rounded-sm w-full lg:w-3/4 leading-none tracking-wide hover:border-blue-400 focus:outline-none focus:border-blue-400"
              name="keywords"
              placeholder="cari alat praktikum"
              onChange={(event) => {
                setAlatSearchKeywords(event.target.value);
              }}
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-2 text-blue-700">
              <Search />
            </button>
          </div>
        </div>
        <table className="w-full mb-2">
          <thead>
            <tr>
              <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[1%]">
                No
              </th>
              <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[49%]">
                Nama Alat
              </th>
              <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[25%]">
                Stock Tersedia
              </th>
              <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-center font-medium text-zinc-400 w-[25%]">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {alatPraktikumPayloads?.data?.map((values, index) => {
              const { id, nama_barang, stok_tersedia } = values;

              const regex = new RegExp(`(${alatSearchKeywords})`, "gi");
              const searchedNamaAlat = nama_barang.replace(regex, (match) => `<td><b>${match}</b></td>`);

              return (
                <tr key={id}>
                  <td className="w-fit border-b border-zinc-300 bg-zinc-50 p-2 text-xs text-zinc-600 text-center">
                    {index + 1}
                  </td>
                  <td
                    className="w-fit border-b border-zinc-300 bg-zinc-50 p-2 text-xs text-zinc-600 text-left"
                    dangerouslySetInnerHTML={{ __html: searchedNamaAlat }}></td>
                  <td className="w-fit border-b border-zinc-300 bg-zinc-50 p-2 text-xs text-zinc-600 text-left tracking-wide">
                    {parseInt(stok_tersedia) === 0 ? "Stok Habis" : `${parseInt(stok_tersedia)} buah`}
                  </td>
                  <td className="w-fit border-b border-zinc-300 bg-zinc-50 p-2 text-xs text-center">
                    <button
                      disabled={parseInt(stok_tersedia) === 0 ? true : false}
                      onClick={() => openMahasiswaPeminjamanDialog(id)}
                      className={`${
                        parseInt(stok_tersedia) === 0
                          ? "bg-zinc-300 text-zinc-500"
                          : "bg-main hover:bg-main-hover text-zinc-100"
                      } font-medium tracking-wide p-2 transition-colors duration-100 rounded-sm w-full`}>
                      Pinjam
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-end lg:justify-between items-center shadow-md p-2 rounded-sm">
          <p className="hidden lg:block text-xs tracking-wide text-zinc-400">Paginasi Alat Praktikum</p>
          <Pagination
            defaultPage={1}
            siblingCount={0}
            count={alatPraktikumPayloads?.last_page}
            color="primary"
            shape="rounded"
            variant="outlined"
            onChange={handleChangeAlatPagination}
          />
        </div>
      </div>
      <div>
        <div className="flex-col lg:flex-row flex justify-between items-center mb-3 bg-white p-2 rounded-sm shadow-md">
          <p className="text-center mb-3 lg:mb-0 lg:text-left text-sm text-zinc-400 tracking-wider w-full">
            Bahan Praktikum Tersedia
          </p>
          <div className="flex justify-center lg:justify-end relative w-full">
            <input
              type="text"
              autoComplete="off"
              className="p-2 text-xs border-2 border-blue-300 rounded-sm w-full lg:w-3/4 leading-none tracking-wide hover:border-blue-400 focus:outline-none focus:border-blue-400"
              name="keywords"
              placeholder="cari bahan praktikum"
              onChange={(event) => {
                setBahanSearchKeywords(event.target.value);
              }}
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-2 text-blue-600">
              <Search />
            </button>
          </div>
        </div>
        <table className="w-full mb-2">
          <thead>
            <tr>
              <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[1%]">
                No
              </th>
              <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[49%]">
                Nama Bahan
              </th>
              <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[25%]">
                Stock Tersedia
              </th>
              <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-center font-medium text-zinc-400 w-[25%]">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {bahanPraktikumPayloads?.data?.map((values, index) => {
              const { id, nama_barang, stok_tersedia } = values;

              const regex = new RegExp(`(${bahanSearchKeywords})`, "gi");
              const searchedNamaBahan = nama_barang.replace(regex, (match) => `<td><b>${match}</b></td>`);

              return (
                <tr key={id}>
                  <td className="w-fit border-b border-zinc-300 bg-zinc-50 p-2   text-xs text-zinc-600 text-center">{index + 1}</td>
                  <td
                    className="w-fit border-b border-zinc-300 bg-zinc-50 p-2 text-xs text-zinc-600 text-left"
                    dangerouslySetInnerHTML={{ __html: searchedNamaBahan }}></td>
                  <td className="w-fit border-b border-zinc-300 bg-zinc-50 p-2 text-xs text-zinc-600 text-center tracking-wide">
                    {parseInt(stok_tersedia) === 0 ? "Stok Habis" : parseInt(stok_tersedia)}
                  </td>
                  <td className="w-fit border-b border-zinc-300 bg-zinc-50 p-2 text-xs text-center">
                    <button
                      disabled={parseInt(stok_tersedia) === 0 ? true : false}
                      onClick={() => openMahasiswaPeminjamanDialog(id)}
                      className={`${
                        parseInt(stok_tersedia) === 0
                          ? "bg-zinc-300 text-zinc-500"
                          : "bg-main hover:bg-main-hover text-zinc-100"
                      } font-medium tracking-wide p-2 transition-colors duration-100 rounded-sm w-full`}>
                      Pinjam
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-end lg:justify-between items-center shadow-md p-2 rounded-md">
          <p className="hidden lg:block text-xs tracking-wide text-zinc-400">Paginasi Bahan Praktikum</p>
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
