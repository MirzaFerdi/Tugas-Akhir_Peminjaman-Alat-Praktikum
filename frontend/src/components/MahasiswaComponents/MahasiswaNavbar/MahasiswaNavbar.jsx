import PropTypes from "prop-types";
import { Container, MahasiswaAppbar } from "../..";
import { logoImage } from "../../../assets";
import { mahasiswaNavbarContents } from "../../../constants/mahasiswa-navbar-contents";

const MahasiswaNavbar = ({ mahasiswaPageId, handleChangeMahasiswaPageId }) => {
  return (
    <div className="mb-8 sticky top-0 bg-white z-10">
      <MahasiswaAppbar mahasiswaPageId={mahasiswaPageId} handleChangeMahasiswaPageId={handleChangeMahasiswaPageId} />
      <div className="shadow-md py-3 mb-8 lg:mb-0">
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <a href="/" className="flex items-center w-fit">
                <img
                  src={logoImage}
                  alt="Polinema Logo Images"
                  width="64"
                  height="64"
                  className="aspect-square w-[42px] h-[42px] lg:w-[64px] lg:h-[64px] mr-3"
                />
                <div>
                  <p className="leading-none text-xs lg:text-sm mb-2 tracking-wide font-medium">
                    Aplikasi Sistem Peminjaman
                  </p>
                  <p className="leading-none text-xs text-zinc-600 tracking-wide mb-1">
                    Alat dan Bahan Praktikum Bengkel TRO
                  </p>
                  <p className="leading-none text-xs text-zinc-600 tracking-wide">Polinema PSDKU Lumajang</p>
                </div>
              </a>
            </div>
            <div className="hidden lg:flex items-center justify-between gap-3">
              {mahasiswaNavbarContents.map((buttons) => {
                const { id, buttonText } = buttons;

                return (
                  <button
                    key={id}
                    onClick={() => handleChangeMahasiswaPageId(id)}
                    className={
                      mahasiswaPageId === id
                        ? "w-full py-2 px-5 leading-none text-xs border-2 border-blue-400 bg-blue-400 text-white rounded-full tracking-wide transition-all duration-100 hover:bg-blue-400 hover:text-white"
                        : "w-full py-2 px-5 leading-none text-xs border-2 border-blue-400 rounded-full text-zinc-600 tracking-wide transition-all duration-100 hover:bg-blue-400 hover:text-white"
                    }>
                    {buttonText}
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

MahasiswaNavbar.propTypes = {
  handleChangeMahasiswaPageId: PropTypes.func,
  mahasiswaPageId: PropTypes.number,
};

export default MahasiswaNavbar;
