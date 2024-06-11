import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { failedIcon, successIcon } from "../../assets";

const EmailAuthResult = () => {
  const navigate = useNavigate();

  const { result } = useParams();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 5000);
  }, [navigate]);

  return (
    <React.Fragment>
      {result == "true" ? (
        <div className="relative w-screen h-screen bg-slate-100 bg-forgot-password bg-no-repeat bg-cover">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] lg:w-[30%] bg-[#ffffff32] backdrop-blur-sm rounded-md px-6 lg:px-8 py-4 lg:py-12 shadow-md">
            <div className="mb-7 flex flex-col items-center">
              <img src={successIcon} alt="Successful Icon" width={128} height={128} className="aspect-square mb-3" />
              <h1 className="text-center font-bold tracking-wider text-2xl mb-3">
                TOKEN RESET PASSWORD <span className="text-green-800">TERKIRIM!</span>!
              </h1>
              <p className="text-xs tracking-wide text-zinc-500 text-center">
                Cek email anda, dan klik link yang sudah tersedia di dalam pesan email.
              </p>
            </div>
            <div className="relative pb-4">
              <div className="absolute w-1/4 h-[0.08rem] bg-zinc-400 left-1/2 -translate-x-1/2" />
            </div>
            <p className="text-xs text-center italic text-zinc-700 mb-5">
              {`" Pengiriman token reset password berhasil!"`}
            </p>
            <p className="text-xs text-center text-zinc-700">Note By : </p>
            <p className="text-sm text-center italic text-zinc-700">Mirza dan Rafly</p>
          </div>
          <p className="text-xs text-center italic text-zinc-600 absolute bottom-5 left-1/2 -translate-x-1/2">
            Copyrights&copy; & All Rights Reserved By Polinema PSDKU Lumajang 2024.
          </p>
        </div>
      ) : (
        <div className="relative w-screen h-screen bg-slate-100 bg-forgot-password bg-no-repeat bg-cover">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] lg:w-[30%] bg-[#ffffff32] backdrop-blur-sm rounded-md px-6 lg:px-8 py-4 lg:py-12 shadow-md">
            <div className="mb-7 flex flex-col items-center">
              <img src={failedIcon} alt="Failed Icon" width={128} height={128} className="aspect-square mb-3" />
              <h1 className="text-center font-bold tracking-wider text-2xl mb-3">
                PENGIRIMAN TOKEN RESET PASSWORD <span className="text-red-500">GAGAL</span>!
              </h1>
              <p className="text-xs tracking-wide text-zinc-500 text-center">
                Alamat mail yang anda masukkan tidak terdaftar, coba periksa kembali email anda dan pastikan anda
                mengisi alamat email yang terdaftar dalam aplikasi!
              </p>
            </div>
            <a
              href={`/forgot-password}`}
              className="block w-full text-sm text-center mb-8 text-white bg-blue-400 hover:bg-blue-500 transition-colors duration-150 p-3 rounded-md">
              <span>KEMBALI ISI EMAIL</span>
            </a>
            <div className="relative pb-4">
              <div className="absolute w-1/4 h-[0.08rem] bg-zinc-400 left-1/2 -translate-x-1/2" />
            </div>
            <p className="text-xs text-center italic text-zinc-700 mb-5">
              {`" Pengiriman token reset password gagal, coba cek kembali alamat email yang anda masukkan!"`}
            </p>
            <p className="text-xs text-center text-zinc-700">Note By : </p>
            <p className="text-sm text-center italic text-zinc-700">Mirza dan Rafly</p>
          </div>
          <p className="text-xs text-center italic text-zinc-600 absolute bottom-5 left-1/2 -translate-x-1/2">
            Copyrights&copy; & All Rights Reserved By Polinema PSDKU Lumajang 2024.
          </p>
        </div>
      )}
    </React.Fragment>
  );
};

export default EmailAuthResult;
