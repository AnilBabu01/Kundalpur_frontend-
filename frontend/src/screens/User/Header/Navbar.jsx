import React, { useState, useEffect } from "react";
import style from "./Navbar.module.css";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { secondaryColor } from "../../../utils/colorVariables";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../../assets/logo1.jpeg";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import Logout from "@mui/icons-material/Logout";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setisMobile] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const token = localStorage.getItem("token");
  useEffect(() => {}, [isMobile, token]);

  const logout = () => {
    handleClose();
    localStorage.removeItem("nowtoken");
  };
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate("/profile")}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={() => navigate("/donationhistory")}>
          <ListItemIcon>
            <VolunteerActivismIcon fontSize="small" />
          </ListItemIcon>
          Donation History
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <BookmarkAddedIcon fontSize="small" />
          </ListItemIcon>
          Room Booking History
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <nav className={style.navbar}>
        <NavLink to="/">
          <div className={style.logo}>
            <img src={Logo} alt=" Logo" />
          </div>
        </NavLink>

        <ul
          className={isMobile ? style.mobilelinks : style.navlinks}
          onClick={() => setisMobile(false)}
        >
          <li>
            <NavLink
              to="/donation"
              className={({ isActive }) =>
                isActive ? style.active : style.about
              }
            >
              Donation
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/paymenthistory"
              className={({ isActive }) =>
                isActive ? style.active : style.about
              }
            >
              Room Booking
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/paymenthistory"
              className={({ isActive }) =>
                isActive ? style.active : style.about
              }
            >
              About us
            </NavLink>
          </li>

          {localStorage.getItem("nowtoken") ? (
            <li>
              <div className={style.profilemaindivheader}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{
                      width: 35,
                      height: 35,
                    }}
                  />

                  <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-label="more"
                  >
                    <ArrowDropDownOutlinedIcon
                      size="large"
                      sx={{ color: secondaryColor }}
                    />
                  </IconButton>
                </Box>
              </div>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? style.active : style.login
                  }
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <i
          style={{ marginRight: "20px" }}
          onClick={() => setisMobile(!isMobile)}
          className={style.mobileMenuIcon}
        >
          {isMobile ? (
            <>
              <CloseIcon style={{ height: "40px" }} className={style.burger} />
            </>
          ) : (
            <>
              <MenuIcon style={{ height: "40px" }} className={style.burger} />
            </>
          )}
        </i>
      </nav>
    </>
  );
};

export default Navbar;