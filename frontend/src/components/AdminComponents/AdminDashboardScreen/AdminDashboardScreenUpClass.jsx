import PropTypes from "prop-types";
import { Checkbox, Pagination } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useConfirmDialog } from "../../../hooks/useDialog";
import { useAlert } from "../../../hooks/useAlert";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";

const AdminDashboardScreenUpClass = ({ allMahasiswaKeywords }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedMahasiswa, setSelectedMahasiswa] = useState([]);
  const [allMahasiswaPage, setAllMahasiswaPage] = useState(1);

  const { data: allMahasiswaData } = useFetchOnMount({
    url:
      allMahasiswaKeywords === ""
        ? `/user/mahasiswa/pagination?page=${allMahasiswaPage}`
        : `user/search/${allMahasiswaKeywords}`,
    method: "GET",
  });
  const { fetchData: fetchMahasiswaNaikKelas } = useFetchOnClick();
  const { openConfirmDialog, closeConfirmDialog } = useConfirmDialog();
  const { openAlertComponent, closeAlertComponent } = useAlert();

  const toggleCheckbox = (id) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleChangeMahasiswaPage = (event, value) => {
    setAllMahasiswaPage(value);
  };

  useEffect(() => {
    const entries = Object.entries(checkedItems);
    const trueEntries = entries.filter(([_, value]) => value === true);

    const arrayOfObjects = trueEntries.map(([key, value]) => ({
      id: parseInt(key),
      // isChecked: value,
    }));

    setSelectedMahasiswa(arrayOfObjects);
  }, [checkedItems, setSelectedMahasiswa]);

  const handleSuccessNaikKelas = useCallback(
    (mahasiswaNaikKelasSuccessResponse) => {
      if (mahasiswaNaikKelasSuccessResponse?.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: mahasiswaNaikKelasSuccessResponse?.message,
        });
        setTimeout(() => {
          closeConfirmDialog();
          closeAlertComponent();
          window.location.reload();
        }, 2000);
      }
    },
    [closeAlertComponent, closeConfirmDialog, openAlertComponent]
  );

  const handleErrorNaikKelas = useCallback((mahasiswaNaikKelasErrorResponse) => {
    console.log(mahasiswaNaikKelasErrorResponse);
  }, []);

  const handleNaikKelas = () => {
    const selectedMahasiswaId = selectedMahasiswa.map((values) => {
      return values.id;
    });

    openConfirmDialog({
      title: "Mahasiswa Naik Kelas",
      message: "Apakah anda yakin ingin menaikkan kelas setiap mahasiswa?",
      okAction: () => {
        fetchMahasiswaNaikKelas({
          url: "/kelas/naik",
          method: "PUT",
          body: {
            id: selectedMahasiswaId,
          },
          onSuccess: handleSuccessNaikKelas,
          onError: handleErrorNaikKelas,
        });
      },
    });
  };

  return (
    <div className="col-span-5 mb-4">
      <table className="w-full mb-3">
        <thead>
          <tr>
            <th className="w-[10%] border p-1 text-center text-xs text-zinc-700 bg-blue-200 tracking-wider font-semibold">
              <Checkbox
                size="small"
                checked={Object.values(checkedItems).every((item) => item)}
                onChange={() => {
                  const newCheckedState = Object.fromEntries(allMahasiswaData?.data?.map(({ id }) => [id, true]));
                  setCheckedItems(newCheckedState);
                }}
              />
            </th>
            <th className="w-[20%] border p-2 text-start text-xs text-zinc-700 bg-blue-200 tracking-wider font-semibold">
              NIM
            </th>
            <th className="w-[50%] border p-2 text-start text-xs text-zinc-700 bg-blue-200 tracking-wider font-semibold">
              Nama Mahasiswa
            </th>
            <th className="w-[20%] border p-2 text-start text-xs text-zinc-700 bg-blue-200 tracking-wider font-semibold">
              Kelas
            </th>
          </tr>
        </thead>
        <tbody>
          {allMahasiswaData?.length === 0 ? (
            <tr>
              <td colSpan={4} className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-center">
                Data mahasiswa tidak ditemukan
              </td>
            </tr>
          ) : (
            allMahasiswaData?.data?.map((values) => {
              const { id, username, nama, kelas_id } = values;

              const regex = new RegExp(`(${allMahasiswaKeywords})`, "gi");
              const searchedUsername = username.replace(regex, (match) => `<td><b>${match}</b></td>`);
              const searchedNama = nama.replace(regex, (match) => `<td><b>${match}</b></td>`);

              return (
                <tr key={id}>
                  <td className="w-fit border bg-zinc-50 px-2 text-xs text-zinc-600 text-center">
                    <Checkbox size="small" checked={checkedItems[id] || false} onChange={() => toggleCheckbox(id)} />
                  </td>
                  <td
                    className="w-fit border bg-zinc-50 px-2 text-xs text-zinc-600 text-left"
                    dangerouslySetInnerHTML={{ __html: searchedUsername }}></td>
                  <td
                    className="w-fit border bg-zinc-50 px-2 text-xs text-zinc-600 text-left"
                    dangerouslySetInnerHTML={{ __html: searchedNama }}></td>
                  <td className="w-fit border bg-zinc-50 px-2 text-xs text-zinc-600 text-left">Kelas {kelas_id}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div className="flex justify-between items-center">
        <button
          onClick={() => handleNaikKelas()}
          disabled={selectedMahasiswa.length === 0 ? true : false}
          className={`${
            selectedMahasiswa.length === 0 ? "bg-zinc-400" : "bg-blue-400 hover:bg-blue-500"
          } text-white py-3 px-5 text-xs tracking-wide leading-none  rounded-sm transition-colors duration-100`}>
          Manajemen Naik Kelas
        </button>
        <Pagination
          count={allMahasiswaData?.last_page}
          variant="outlined"
          color="primary"
          size="small"
          shape="rounded"
          onChange={handleChangeMahasiswaPage}
        />
      </div>
    </div>
  );
};

AdminDashboardScreenUpClass.propTypes = {
  allMahasiswaData: PropTypes.any,
  allMahasiswaKeywords: PropTypes.any,
};

export default AdminDashboardScreenUpClass;
