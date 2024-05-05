import { Email, Notifications, Person } from "@mui/icons-material";
import { Container } from "../../";
import { date } from "../../../utils/datetime";
import { useAdminProfileDrawer } from "../../../hooks/useProfileDrawer";

const AdminAppbar = () => {
  const { openAdminProfileDrawer } = useAdminProfileDrawer();

  return (
    <div className="bg-blue-500 py-3 lg:py-2">
      <Container>
        <div className="flex justify-between items-center">
          <p className="text-sm tracking-wide leading-none text-white">{date(new Date())}</p>
          <div className="flex items-center">
            <div className="flex items-center gap-2 lg:gap-5">
              <button className="text-gray-300 hover:text-white transition-all duration-200">
                <Email />
              </button>
              <button className="text-gray-300 hover:text-white transition-all duration-200">
                <Notifications />
              </button>
              <button
                onClick={() => openAdminProfileDrawer()}
                className="text-gray-300 hover:text-white transition-all duration-200">
                <Person />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminAppbar;
