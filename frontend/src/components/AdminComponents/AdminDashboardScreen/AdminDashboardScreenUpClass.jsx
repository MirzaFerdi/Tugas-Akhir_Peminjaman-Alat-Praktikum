import PropTypes from "prop-types";
import { Checkbox } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useConfirmDialog } from "../../../hooks/useDialog";
import { useAlert } from "../../../hooks/useAlert";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";

const AdminDashboardScreenUpClass = ({ allMahasiswaData }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedMahasiswa, setSelectedMahasiswa] = useState([]);

  const { fetchData: fetchMahasiswaNaikKelas } = useFetchOnClick();
  const { openConfirmDialog, closeConfirmDialog } = useConfirmDialog();
  const { openAlertComponent, closeAlertComponent } = useAlert();

  const toggleCheckbox = (id) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
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
      <table className="w-full mb-8">
        <thead>
          <tr>
            <th className="w-[10%] border p-1 text-center text-xs text-zinc-700 bg-blue-200 tracking-wider font-semibold">
              <Checkbox
                size="small"
                checked={Object.values(checkedItems).every((item) => item)}
                onChange={() => {
                  const newCheckedState = Object.fromEntries(allMahasiswaData.map(({ id }) => [id, true]));
                  setCheckedItems(newCheckedState);
                }}
              />
            </th>
            <th className="w-[20%] border p-2 text-start text-xs text-zinc-700 bg-blue-200 tracking-wider font-semibold">
              NIM
            </th>
            <th className="w-[60%] border p-2 text-start text-xs text-zinc-700 bg-blue-200 tracking-wider font-semibold">
              Nama Mahasiswa
            </th>
            <th className="w-[10%] border p-2 text-start text-xs text-zinc-700 bg-blue-200 tracking-wider font-semibold">
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
            allMahasiswaData.map((values) => {
              const { id, username, nama, kelas } = values;

              return (
                <tr key={id}>
                  <td className="w-fit border bg-zinc-50 px-2 text-xs text-zinc-600 text-center">
                    <Checkbox size="small" checked={checkedItems[id] || false} onChange={() => toggleCheckbox(id)} />
                  </td>
                  <td className="w-fit border bg-zinc-50 px-2 text-xs text-zinc-600 text-left">{username}</td>
                  <td className="w-fit border bg-zinc-50 px-2 text-xs text-zinc-600 text-left">{nama}</td>
                  <td className="w-fit border bg-zinc-50 px-2 text-xs text-zinc-600 text-left">Kelas {kelas?.id}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <button
        onClick={() => handleNaikKelas()}
        disabled={selectedMahasiswa.length === 0 ? true : false}
        className={`${
          selectedMahasiswa.length === 0 ? "bg-zinc-300" : "bg-blue-400 hover:bg-blue-500"
        } text-white py-3 px-5 text-sm tracking-wide leading-none  rounded-sm transition-colors duration-100`}>
        Manajemen Naik Kelas
      </button>
    </div>
  );
};

AdminDashboardScreenUpClass.propTypes = {
  allMahasiswaData: PropTypes.any,
};

export default AdminDashboardScreenUpClass;
