import React from "react";
import EditPhotoDialog from "../EditPhotoDialog/EditPhotoDialog";
import { AddPhotoAlternate, Email, Person, Phone, School } from "@mui/icons-material";
import { welcomeMahasiswaImage } from "../../assets";
import { useEditPhotoDialog } from "../../hooks/useDialog";
import { useFetchOnMount } from "../../hooks/useFetchOnMount";

const Profile = () => {
  const { userId } = JSON.parse(localStorage.getItem("user_payloads"));

  const { data: userPayloads } = useFetchOnMount({
    url: `/user/${userId}`,
    method: "GET",
  });  

  const { openEditPhoto } = useEditPhotoDialog();

  return (
    <React.Fragment>
      <EditPhotoDialog userPayloads={userPayloads} />
      <div className="grid grid-cols-1 lg:grid-cols-5 items-center shadow-sm shadow-main w-full h-[26rem] lg:h-[18rem] my-12 backdrop-blur-sm relative rounded-md bg-mahasiswa-welcome-bg bg-cover">
        <div className="col-span-1 lg:col-span-3 p-6">
          <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center lg:items-start">
            <div className="mb-8 lg:mb-0 mr-0 lg:mr-8 flex flex-col items-center">
              <img
                src={
                  userPayloads?.foto
                    ? `https://api.sipeminjam.indonesiadigitalsolutions.com/storage/foto/${userPayloads?.foto}`
                    : "https://i.pravatar.cc/150"
                }
                alt="Profil Photo"
                className="aspect-square mb-4 w-28 h-28 rounded-full border-2 border-blue-300 p-1"
              />
              <button
                onClick={() => openEditPhoto()}
                className="bg-blue-300 leading-none hover:bg-blue-400 transition-colors duration-150 px-3 py-1 text-sm rounded-sm flex items-center justify-start">
                <AddPhotoAlternate fontSize="small" />
                <p className="ml-3">Edit Foto</p>
              </button>
            </div>
            <div>
              <h1 className="text-white font-bold tracking-wider text-xl lg:text-3xl mb-4 text-center lg:text-start">
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
                <p className="text-sm text-zinc-100 tracking-wider">
                  {userPayloads?.role?.id === 1 ? "Administrator" : `Kelas ${userPayloads?.kelas_id}`}
                </p>
              </div>
              <div className="flex justify-start items-center text-blue-300 tracking-wide mb-2">
                <Phone fontSize="small" sx={{ mr: 1 }} />{" "}
                <p className="text-sm text-zinc-100 tracking-wider">{userPayloads?.nohp}</p>
              </div>
            </div>
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
