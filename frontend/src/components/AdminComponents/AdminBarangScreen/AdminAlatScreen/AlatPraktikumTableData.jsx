import PropTypes from "prop-types";
import { Delete, Edit } from "@mui/icons-material";
import { alatPraktikumTableHeader } from "../../../../constants/admin-barang-contents";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";
import { useCallback } from "react";
import { useAdminEditBarangDialog, useConfirmDialog } from "../../../../hooks/useDialog";
import { useFetchOnClick } from "../../../../hooks/useFetchOnClick";
import { useAlert } from "../../../../hooks/useAlert";

const AlatPraktikumTableData = ({ alatKeywords, paginationPage, setCount }) => {
  const { openEditBarangDialog } = useAdminEditBarangDialog();
  const { openConfirmDialog, closeConfirmDialog } = useConfirmDialog();
  const { openAlertComponent, closeAlertComponent } = useAlert();

  const handleSuccessDataAlatPraktikumResponse = useCallback(
    (dataAlatPraktikumSuccessResponse) => {
      setCount(dataAlatPraktikumSuccessResponse?.last_page);
    },
    [setCount]
  );

  const { data: dataAlatPraktikum } = useFetchOnMount({
    url:
      alatKeywords === "" ? `/barang/pagination/alat/8?page=${paginationPage}` : `/barang/search/alat/${alatKeywords}`,
    method: "GET",
    onSuccess: handleSuccessDataAlatPraktikumResponse,
  });
  const { fetchData: dataAlatById } = useFetchOnClick();
  const { fetchData: deleteDataAlat } = useFetchOnClick();

  const handleGetBarangByIdSuccessResponse = useCallback(
    (getBarangByIdSuccessResponse) => {
      openEditBarangDialog(getBarangByIdSuccessResponse);
    },
    [openEditBarangDialog]
  );

  const handleEditBarang = (selectedBarangId) => {
    dataAlatById({
      url: `/barang/${selectedBarangId}`,
      method: "GET",
      onSuccess: handleGetBarangByIdSuccessResponse,
    });
  };

  const handleDeleteAlatSuccessResponse = useCallback(
    (deleteAlatSuccessResponse) => {
      if (deleteAlatSuccessResponse?.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: deleteAlatSuccessResponse?.message,
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

  const handleDeleteAlat = (selectedAlatId) => {
    openConfirmDialog({
      title: "Hapus Data Alat",
      message: "Apakah anda yakin ingin menghapus data alat tersebut?",
      okAction: () => {
        deleteDataAlat({
          url: `/barang/${selectedAlatId}`,
          method: "DELETE",
          onSuccess: handleDeleteAlatSuccessResponse,
        });
      },
    });
  };

  return (
    <table className="w-full">
      <thead>
        <tr>
          {alatPraktikumTableHeader.map((rows) => {
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
        {dataAlatPraktikum?.data?.length > 0 ? (
          dataAlatPraktikum?.data?.map((payloads, index) => {
            const { id, kode_barang, nama_barang, stok_awal, stok_tersedia } = payloads;

            const regex = new RegExp(`(${alatKeywords})`, "gi");
            const searchedKodeAlat = kode_barang.replace(regex, (match) => `<td><b>${match}</b></td>`);
            const searchedNamaAlat = nama_barang.replace(regex, (match) => `<td><b>${match}</b></td>`);

            return (
              <tr key={id}>
                <td className="w-fit border p-2 text-xs text-zinc-600 text-center">{index + 1}</td>
                <td
                  className="w-fit border p-2 text-xs text-zinc-600 text-center"
                  dangerouslySetInnerHTML={{ __html: searchedKodeAlat }}></td>
                <td
                  className="w-fit border p-2 text-xs text-zinc-600 text-left"
                  dangerouslySetInnerHTML={{ __html: searchedNamaAlat }}></td>
                <td className="w-fit border p-2 text-xs text-zinc-600 text-center">{stok_awal} Buah</td>
                <td className="w-fit border p-2 text-xs text-zinc-600 text-center">{stok_tersedia} Buah</td>
                <td className="w-fit border p-2 text-xs text-center">
                  <button onClick={() => handleEditBarang(id)} className="text-blue-400">
                    <Edit fontSize="small" />
                  </button>
                </td>
                <td className="w-fit border p-2 text-xs text-center">
                  <button onClick={() => handleDeleteAlat(id)} className="text-red-500">
                    <Delete fontSize="small" />
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={7} className="p-2 border text-xs text-center">
              Alat tidak ditemukan!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

AlatPraktikumTableData.propTypes = {
  alatKeywords: PropTypes.string,
  barangKategori: PropTypes.any,
  paginationPage: PropTypes.any,
  setCount: PropTypes.func,
};

export default AlatPraktikumTableData;
