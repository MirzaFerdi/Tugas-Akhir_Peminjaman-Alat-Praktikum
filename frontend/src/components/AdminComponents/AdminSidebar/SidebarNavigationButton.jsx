import PropTypes from "prop-types"
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useAdminPageId } from "../../../hooks/usePage";
import { useSidebar } from "../../../hooks/useSidebar";
import { useMediaQuery } from "react-responsive";

const SidebarNavigationButton = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 1439px)" });

  const { adminPageId, handleChangeAdminPageId } = useAdminPageId();
  const { closeSidebar } = useSidebar();

  const handleChangePage = (id) => {
    handleChangeAdminPageId(id);
    isMobile && closeSidebar();
  };

  return (
    <ListItemButton
      onClick={() => handleChangePage(props.menuId)}
      sx={{
        pl: props.pl,
        backgroundColor: adminPageId === props.menuId ? "#1D0C5A" : "inherit",
        ":hover": {
          backgroundColor: adminPageId === props.menuId ? "#1D0C5A" : "#1D0C5A",
        },
      }}>
      <ListItemIcon>
        {props.menuIcon}
      </ListItemIcon>
      <ListItemText
        primary={props.menuText}
        primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
      />
    </ListItemButton>
  );
};

SidebarNavigationButton.propTypes = {
  menuIcon: PropTypes.any,
  menuId: PropTypes.any,
  menuText: PropTypes.any,
  pl: PropTypes.any
}

export default SidebarNavigationButton;
