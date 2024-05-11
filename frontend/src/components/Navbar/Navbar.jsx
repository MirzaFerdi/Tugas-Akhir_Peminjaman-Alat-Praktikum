import PropTypes from "prop-types";
import { adminNavbarContents } from "../../constants/admin-navbar-contents";
import { KeyboardDoubleArrowLeft } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const Navbar = ({ adminPageId, handleChangeAdminPageId }) => {
  return (
    <div className="shadow-md flex flex-col justify-center h-full w-full top-0 bg-white">
      <div className="h-full grid grid-cols-2 items-center px-4 lg:mb-0">
        <div>
          <button>
            <KeyboardDoubleArrowLeft />
          </button>
        </div>
        <div className="flex items-center justify-end gap-3">
          {adminNavbarContents.map((buttons) => {
            const { id, buttonText, icon } = buttons;

            return (
              <Tooltip key={id} placement="bottom-start" title={buttonText}>
                <button
                  onClick={() => handleChangeAdminPageId(id)}
                  className={
                    adminPageId === id
                      ? "p-2 leading-none text-xs border-2 text-white bg-main rounded-full tracking-wide transition-all duration-100 hover:bg-main hover:text-white"
                      : "p-2 leading-none text-xs border-2 rounded-full text-zinc-600 tracking-wide transition-all duration-100 hover:bg-main hover:text-white"
                  }>
                  {icon}
                </button>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  adminPageId: PropTypes.number,
  handleChangeAdminPageId: PropTypes.func,
};

export default Navbar;
