import { Email, Person, Phone, School } from "@mui/icons-material";
import { welcomeMahasiswaImage } from "../../assets";
import React from "react";

const Profile = () => {
  const userPayloads = JSON.parse(localStorage.getItem("user_payloads"));

  return (
    <React.Fragment>
      <div className="grid grid-cols-1 lg:grid-cols-5 shadow-sm shadow-main w-full h-[18rem] my-12 backdrop-blur-sm relative rounded-md bg-mahasiswa-welcome-bg bg-cover">
        <div className="col-span-1 lg:col-span-3 p-6">
          <h1 className="text-white font-bold tracking-wider text-3xl mb-5">{userPayloads?.user?.nama}</h1>
          <div className="flex justify-start items-center text-blue-300 tracking-wide mb-2">
            <Email fontSize="small" sx={{ mr: 1 }} />{" "}
            <p className="text-sm text-zinc-100 tracking-wider">{userPayloads?.user?.email}</p>
          </div>
          <div className="flex justify-start items-center text-blue-300 tracking-wide mb-2">
            <Person fontSize="small" sx={{ mr: 1 }} />{" "}
            <p className="text-sm text-zinc-100 tracking-wider">
              {userPayloads?.user?.username} - {userPayloads?.user?.role?.nama}
            </p>
          </div>
          <div className="flex justify-start items-center text-blue-300 tracking-wide mb-2">
            <School fontSize="small" sx={{ mr: 1 }} />{" "}
            <p className="text-sm text-zinc-100 tracking-wider">
              {userPayloads?.user?.role?.id === 1 ? "Administrator" : userPayloads?.user?.kelas_id}
            </p>
          </div>
          <div className="flex justify-start items-center text-blue-300 tracking-wide mb-2">
            <Phone fontSize="small" sx={{ mr: 1 }} />{" "}
            <p className="text-sm text-zinc-100 tracking-wider">{userPayloads?.user?.nohp}</p>
          </div>
        </div>
        <div className="hidden lg:block col-span-2">
          <img
            src={welcomeMahasiswaImage}
            alt="Mahasiswa Dashboard Header Welcome Image"
            className="w-[28rem] absolute right-24 bottom-0 scale-x-[-1] drop-shadow-[0_0_3px_white]"
          />
        </div>
      </div>
      <div className="p-4 bg-white shadow-md rounded-md">
        <h1 className="text-xl mb-5 font-bold tracking-wider">Pengaturan Aplikasi</h1>

        <p className="mb-2">Tema Aplikasi</p>
        <div className="flex justify-start items-center gap-5">
          <button className="p-5 rounded-lg bg-main hover:scale-110 shadow-sm shadow-main transition-all duration-100"></button>
          <button className="p-5 rounded-lg bg-fuchsia-700 shadow-sm shadow-fuchsia-700 hover:scale-110 transition-all duration-100"></button>
          <button className="p-5 rounded-lg bg-blue-300 shadow-sm shadow-blue-300 hover:scale-110 transition-all duration-100"></button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
