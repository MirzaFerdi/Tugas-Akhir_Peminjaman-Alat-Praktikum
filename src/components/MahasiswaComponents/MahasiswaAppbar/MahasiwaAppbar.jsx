import PropTypes from "prop-types";
import { Email, Notifications, Person } from "@mui/icons-material";
import { Container } from "../../";
import { date } from "../../../utils/datetime";
import { useMahasiswaProfileDrawer } from "../../../hooks/useProfileDrawer";

const MahasiwaAppbar = ({ mahasiswaPageId, handleChangeMahasiswaPageId }) => {
  const { openMahasiswaProfileDrawer } = useMahasiswaProfileDrawer();

  return (
    <div className="bg-blue-500 py-3 lg:py-2">
      <Container>
        <div className="flex justify-between items-center">
          <p className="text-sm tracking-wide leading-none text-white">{date(new Date())}</p>
          <div className="flex items-center">
            <div className="flex items-center gap-2 lg:gap-5">
              <button
                onClick={() => handleChangeMahasiswaPageId(6)}
                className={
                  mahasiswaPageId === 6 ? "text-white" : "text-gray-300 hover:text-white transition-all duration-200"
                }>
                <Email />
              </button>
              <button className="text-gray-300 hover:text-white transition-all duration-200">
                <Notifications />
              </button>
              <button
                className="text-gray-300 hover:text-white transition-colors duration-150"
                onClick={() => openMahasiswaProfileDrawer()}>
                <Person />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

MahasiwaAppbar.propTypes = {
  handleChangeMahasiswaPageId: PropTypes.func,
  mahasiswaPageId: PropTypes.number,
};

export default MahasiwaAppbar;

// className={
//   isDrawerProfileOpen
//     ? "text-white"
//     : "text-gray-300 hover:text-white transition-all duration-200"
// }
