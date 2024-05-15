import { Checkbox, IconButton, Pagination, Tooltip } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useConfirmDialog } from "../../../hooks/useDialog";
import { useAlert } from "../../../hooks/useAlert";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";
import { InfoOutlined, Search } from "@mui/icons-material";
import { mahasiswaIcon } from "../../../assets";

const AdminDashboardScreenUpClass = () => {
  const [allMahasiswaKeywords, setAllMahasiswaKeywords] = useState("");
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
    <div>
      <div className="flex justify-between items-center px-8 py-4 bg-main shadow-sm shadow-main mx-8 rounded-xl text-white -mb-10 relative">
        <h1 className="text-2xl tracking-wide font-bold leading-none mr-4">Manajemen Naik Kelas</h1>
        <Tooltip
          placement="bottom-start"
          title="Melalui fitur ini administrator dapat
                  memperbarui status kelas mahasiswa, baik dari kelas 1 ke kelas 2, kelas 2 ke kelas 3, kelas 3 ke
                  kelas 4 dan memberikan status alumni pada mahasiswa kelas 4 sebelumnya, sehingga mahasiswa status alumni tidak
                  dapat melakukan login ke dalam sistem.">
          <IconButton sx={{ color: "white" }}>
            <InfoOutlined />
          </IconButton>
        </Tooltip>
      </div>
      <div className="pb-5 pt-16 bg-white px-8 rounded-md shadow-md">
        <div className="grid grid-cols-2 items-start mb-8">
          <div className="flex flex-col lg:items-start mb-3 lg:mb-0">
            <p className="text-md tracking-wide text-center lg:text-start">Tabel Data Semua Mahasiswa</p>
            <p className="text-sm tracking-wide text-zinc-500 text-center lg:text-start">Teknologi Rekayasa Otomotif</p>
          </div>
          <div className="flex justify-end relative">
            <input
              type="text"
              autoComplete="off"
              className="p-2 text-xs border-2 border-blue-300 rounded-sm w-2/3 lg:w-1/2 leading-none tracking-wide hover:border-blue-400 focus:outline-none focus:border-blue-400"
              placeholder="cari mahasiswa ..."
              onChange={(event) => {
                setAllMahasiswaKeywords(event.target.value);
              }}
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-2 text-blue-700">
              <Search />
            </button>
          </div>
        </div>
        <table className="mb-6 w-full">
          <thead>
            <tr>
              <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-center font-medium text-zinc-400 w-[5%]">
                <Checkbox
                  size="small"
                  checked={Object.values(checkedItems).every((item) => item)}
                  onChange={() => {
                    const newCheckedState = Object.fromEntries(allMahasiswaData?.data?.map(({ id }) => [id, true]));
                    setCheckedItems(newCheckedState);
                  }}
                />
              </th>
              <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[65%]">
                Data Mahasiswa
              </th>
              <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[10%]">
                Kelas
              </th>
            </tr>
          </thead>
          <tbody>
            {allMahasiswaData?.data?.length > 0 ? (
              allMahasiswaData?.data?.map((values) => {
                const { id, nama, username, kelas_id } = values;

                const regex = new RegExp(`(${allMahasiswaKeywords})`, "gi");
                const searchedNama = nama.replace(regex, (match) => `<td><b>${match}</b></td>`);
                const searchedUsername = username.replace(regex, (match) => `<td><b>${match}</b></td>`);

                return (
                  <tr key={id}>
                    <td className="text-center border-b border-zinc-300 p-2">
                      <Checkbox size="small" checked={checkedItems[id] || false} onChange={() => toggleCheckbox(id)} />
                    </td>
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
                          <p
                            className="text-xs tracking-wide text-zinc-400"
                            dangerouslySetInnerHTML={{ __html: searchedUsername }}></p>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-zinc-300 text-xs p-2 w-fit">Kelas {kelas_id}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="p-2 border text-xs text-center">
                  {allMahasiswaData?.message}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-between items-center">
          <button
            onClick={() => handleNaikKelas()}
            disabled={selectedMahasiswa.length > 0 ? false : true}
            className="text-white bg-main hover:bg-main-hover py-3 px-5 text-xs tracking-wide leading-none rounded-sm transition-colors duration-100 disabled:bg-zinc-400">
            Naik Kelas
          </button>
          <Pagination
            count={allMahasiswaData?.last_page}
            onChange={handleChangeMahasiswaPage}
            variant="outlined"
            color="primary"
            shape="rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardScreenUpClass;
