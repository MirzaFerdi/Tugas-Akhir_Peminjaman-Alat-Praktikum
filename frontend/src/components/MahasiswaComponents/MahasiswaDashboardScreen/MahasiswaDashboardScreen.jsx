import React from "react";
import MahasiswaDashboardScreenHeader from "./MahasiswaDashboardScreenHeader";
import { Email, Person, Phone, School } from "@mui/icons-material";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";
import { welcomeMahasiswaImage } from "../../../assets";

const MahasiswaDashboardScreen = () => {
  const {userId} = JSON.parse(localStorage.getItem("user_payloads"));

  const { data: userPayloads } = useFetchOnMount({
    url: `/user/${userId}`,
    method: "GET",
  });
  const { data: mahasiswaPeminjamanData } = useFetchOnMount({
    url: `/peminjaman/user/${userId}`,
    method: "GET",
  });
  const { data: mahasiswaPengembalianData } = useFetchOnMount({
    url: `/pengembalian/user/${userId}`,
    method: "GET",
  });

  return (
    <React.Fragment>
      <div className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 shadow-sm shadow-main w-full h-[18rem] mt-4 lg:mt-12 mb-8 backdrop-blur-sm relative rounded-md bg-mahasiswa-welcome-bg bg-cover">
          <div className="col-span-1 lg:col-span-3 p-6">
            <p className="text-zinc-300 text-md lg:text-lg tracking-wide">Selamat Datang,</p>
            <h1 className="text-white font-bold tracking-wider text-2xl lg:text-3xl mb-3 lg:mb-5">
              {userPayloads?.nama}
            </h1>
            <div className="flex justify-start items-center text-blue-300 tracking-wide mb-2">
              <Email fontSize="small" sx={{ mr: 1 }} />{" "}
              <p className="text-sm text-zinc-100 tracking-wider">{userPayloads?.email}</p>
            </div>
            <div className="flex justify-start items-center text-blue-300 tracking-wide mb-2">
              <Person fontSize="small" sx={{ mr: 1 }} />{" "}
              <p className="text-sm text-zinc-100 tracking-wider">
                {userPayloads?.username} - {userPayloads?.role?.nama}
              </p>
            </div>
            <div className="flex justify-start items-center text-blue-300 tracking-wide mb-2">
              <School fontSize="small" sx={{ mr: 1 }} />{" "}
              <p className="text-sm text-zinc-100 tracking-wider">Kelas {userPayloads?.kelas_id}</p>
            </div>
            <div className="flex justify-start items-center text-blue-300 tracking-wide mb-2">
              <Phone fontSize="small" sx={{ mr: 1 }} />{" "}
              <p className="text-sm text-zinc-100 tracking-wider">{userPayloads?.nohp}</p>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-2">
            <img
              src={welcomeMahasiswaImage}
              alt="Mahasiswa Dashboard Header Welcome Image"
              className="w-[28rem] absolute right-24 bottom-0 scale-x-[-1] drop-shadow-[0_0_3px_white]"
            />
          </div>
        </div>
        <MahasiswaDashboardScreenHeader
          mahasiswaPeminjamanData={mahasiswaPeminjamanData}
          mahasiswaPengembalianData={mahasiswaPengembalianData}
        />
      </div>
    </React.Fragment>
  );
};

export default MahasiswaDashboardScreen;
