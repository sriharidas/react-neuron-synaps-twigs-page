import React from "react";
import "./../css/App.css";
import { RiDashboardFill } from "react-icons/ri";
import { FaUserAlt, FaBell } from "react-icons/fa";
import { MdContentPaste } from "react-icons/md";
import { GrCopy } from "react-icons/gr";
import { FiDatabase, FiLogIn } from "react-icons/fi";
import { RiUserAddLine } from "react-icons/ri";
import { SiGooglemaps } from "react-icons/si";
import { AiOutlineClose } from "react-icons/ai";
import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
export default function Menu({ state, setState }) {
  const history = useHistory();
  return (
    state && (
      <div className="admin-left-container">
        <div className="admin-left-header">
          Neuron Page
          <button
            onClick={() => setState(!state)}
            className="admin-header-toggle"
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="admin-left-nav">
          {MenuData.map((item) => (
            <div
              className="admin-left-nav-group"
              onClick={() => history.push(item.path)}
            >
              <span className="admin-left-nav-icon">{item.icon}</span>
              <div className="admin-left-nav-item">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

const MenuData = [
  {
    icon: <RiDashboardFill />,
    title: "Dashboard",
    path: "/admin/",
  },
  {
    icon: <FaUserAlt />,
    title: "User Profile",
    path: "/admin/",
  },
  {
    icon: <FiDatabase />,
    title: "Data Circuit",
    path: "/admin/datacircuit",
  },
  // {
  //   icon: <GrCopy />,
  //   title: "Typography",
  // },
  {
    icon: <RiUserAddLine />,
    title: "Icons",
    path: "/admin/",
  },
  // {
  //   icon: <SiGooglemaps />,
  //   title: "Maps",
  // },
  {
    icon: <FaBell />,
    title: "Notification",
    path: "/admin/",
  },
  {
    icon: <FiLogIn />,
    title: "Log out",
    path: "/admin/",
  },
];
