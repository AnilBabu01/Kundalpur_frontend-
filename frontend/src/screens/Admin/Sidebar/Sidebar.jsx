import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NavLink, Link } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./Sidebar.css";
const Sidebar = ({ setshowsidebar }) => {
  const [showdropdownmenu1, setshowdropdownmenu1] = useState(false);
  const [showdropdownmenu2, setshowdropdownmenu2] = useState(false);
  const [showdropdownmenu3, setshowdropdownmenu3] = useState(false);
  return (
    <>
      <div className="maindiv">
        <div className="adminlogodiv">
          <p>K-donation-system</p>
        </div>
        <nav className="navbar">
          <ul className="nav-menu">
            <li className="nav-item" onClick={() => setshowsidebar(!true)}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active-nav-link" : "nav-link-no-dropdown"
                }
                to="/admin-panel/dashboard"
              >
                <DashboardIcon style={{ marginRight: "1rem" }} />
                <span className="linkspan"> Dashboard</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active-nav-link" : "nav-link-no-dropdown"
                }
                to="/admin-panel/donatedusers"
              >
                <span className="linkspan">Donated users</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active-nav-link" : "nav-link-no-dropdown"
                }
                to="/admin-panel/master"
              >
                <span className="linkspan"> Masters</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active-nav-link" : "nav-link-no-dropdown"
                }
                to="/admin-panel/roombooking"
              >
                <span className="linkspan"> Room Booking</span>
              </NavLink>
            </li>
            
            {/* <li className="nav-item">
              <div
                className="nav-link"
                onClick={() => setshowdropdownmenu3(!showdropdownmenu3)}
              >
                Manual Donation
                {showdropdownmenu3 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </div>
            </li>

            <div className={showdropdownmenu3 ? "showmenu" : "hidemenu"}>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-nav-link" : "nav-link"
                  }
                  to="/ALLDonations"
                >
                  ALL Donations
                </NavLink>
              </li>
            </div> */}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
