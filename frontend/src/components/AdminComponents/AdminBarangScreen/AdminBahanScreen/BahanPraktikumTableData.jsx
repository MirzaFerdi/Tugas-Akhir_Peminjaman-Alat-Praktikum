import PropTypes from "prop-types";
import { Delete, Edit } from "@mui/icons-material";
import { bahanPraktikumTableHeader } from "../../../../constants/admin-barang-contents";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";
import { useCallback } from "react";

const BahanPraktikumTableData = ({ bahanKeywords, paginationPage, setCount }) => {
  const handleSuccessDataBahanPraktikumResponse = useCallback(
    (dataBahanPraktikumSuccessResponse) => {
      setCount(dataBahanPraktikumSuccessResponse?.last_page);
    },
    [setCount]
  );

  const { data: dataBahanPraktikum } = useFetchOnMount({
    url:
      bahanKeywords === ""
        ? `/barang/pagination/bahan/8?page=${paginationPage}`
        : `/barang/search/bahan/${bahanKeywords}`,
    method: "GET",
    onSuccess: handleSuccessDataBahanPraktikumResponse,
  });

  const dataBahanOnSearch = bahanKeywords === "" ? dataBahanPraktikum?.data : dataBahanPraktikum;

  return (
    <table className="w-full">
      <thead>
        <tr>
          {bahanPraktikumTableHeader.map((rows) => {
            const { id, row, width } = rows;

            return (
              <th
                key={id}
                className={`${
                  id == 3 ? "text-start" : "text-center"
                } border p-2 text-xs text-white bg-blue-400 tracking-wider font-semibold w-[${width}]`}>
                {row}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {dataBahanOnSearch?.length > 0 ? (
          dataBahanOnSearch?.map((payloads, index) => {
            const { id, kode_barang, nama_barang, stok_awal, stok_tersedia } = payloads;

            const regex = new RegExp(`(${bahanKeywords})`, "gi");
            const searchedKodeBahan = kode_barang.replace(regex, (match) => `<td><b>${match}</b></td>`);
            const searchedNamaBahan = nama_barang.replace(regex, (match) => `<td><b>${match}</b></td>`);

            return (
              <tr key={id}>
                <td className="w-fit border p-2 text-xs text-zinc-600 text-center">{index + 1}</td>
                <td
                  className="w-fit border p-2 text-xs text-zinc-600 text-center"
                  dangerouslySetInnerHTML={{ __html: searchedKodeBahan }}></td>
                <td
                  className="w-fit border p-2 text-xs text-zinc-600 text-left"
                  dangerouslySetInnerHTML={{ __html: searchedNamaBahan }}></td>
                <td className="w-fit border p-2 text-xs text-zinc-600 text-center">{stok_awal} Buah</td>
                <td className="w-fit border p-2 text-xs text-zinc-600 text-center">{stok_tersedia} Buah</td>
                <td className="w-fit border p-2 text-xs text-center">
                  <button className="text-blue-400">
                    <Edit fontSize="small" />
                  </button>
                </td>
                <td className="w-fit border p-2 text-xs text-center">
                  <button className="text-red-500">
                    <Delete fontSize="small" />
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={7} className="p-2 border text-xs text-center">
              Bahan tidak ditemukan!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

BahanPraktikumTableData.propTypes = {
  bahanKeywords: PropTypes.string,
  barangKategori: PropTypes.any,
  paginationPage: PropTypes.any,
  setCount: PropTypes.any,
};

export default BahanPraktikumTableData;
