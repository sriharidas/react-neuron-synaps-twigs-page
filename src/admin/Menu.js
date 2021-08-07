import React, { useState, useEffect } from "react";
import "./../css/App.css";
import { RiDashboardFill } from "react-icons/ri";
import { FaUserAlt, FaBell, FaBrain } from "react-icons/fa";
import { MdContentPaste } from "react-icons/md";
import { GrCopy } from "react-icons/gr";
import { FiDatabase, FiLogIn, FiSettings } from "react-icons/fi";
import { RiUserAddLine } from "react-icons/ri";
import { SiFirebase } from "react-icons/si";
import {
  AiOutlineClose,
  AiFillSetting,
  AiFillRobot,
  AiOutlineRobot,
} from "react-icons/ai";
import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
export default function Menu({ state, setState, setTitle }) {
  const [activeLink, setActivateLink] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (
      state &&
      document.getElementById(activeLink) !== "" &&
      activeLink !== ""
    ) {
      console.log(document.getElementById(activeLink));
      console.log(MenuData);

      MenuData.map((element) => {
        // hover effect
        // document.getElementById(element.id).onhover = () => {
        //   console.log("hovering", element.id);
        // };
        // active link
        console.log(element.id === activeLink, element.id, activeLink);
        document.getElementById(element.id).style.cssText =
          "background:inherit;color: #000";
      });
      console.log("Target", document.getElementById(activeLink));
      document.getElementById(activeLink).style.cssText =
        "background:#3a3aff;color: #fff";
    }
  });
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
            <a
              className="admin-left-nav-group"
              onClick={() => {
                history.push(item.path);
                setTitle(item.title);
                setActivateLink(item.id);
              }}
              id={item.id}
            >
              <span className="admin-left-nav-icon">{item.icon}</span>
              <span className="admin-left-nav-item">{item.title}</span>
            </a>
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
    id: "menu-dashboard",
  },
  // {
  //   icon: <FaBell />,
  //   title: "Notification",
  //   path: "/admin/notification",
  // },
  // {
  //   icon: <FiDatabase />,
  //   title: "Data Circuit",
  //   path: "/admin/datacircuit",
  //   id: "menu-ai-model",
  // },
  {
    icon: <FaBrain />,
    title: "Ai Model",
    path: "/admin/ai/model",
    id: "menu-datacircuit",
  },
  {
    icon: <FiSettings />,
    title: "Settings",
    path: "/admin/settings",
    id: "menu-settings",
  },
  // {
  //   icon: <SiFirebase />,
  //   title: "Crashlytics",
  //   path: "/admin/crashlytics",
  // },
  // {
  //   icon: <AiFillSetting />,
  //   title: "Settings",
  //   path: "/admin/settings",
  // },
  // {
  //   icon: <FaUserAlt />,
  //   title: "User Profile",
  //   path: "/admin/userprofile",
  //   id: "menu-userprofile",
  // },

  // {
  //   icon: <FiLogIn />,
  //   title: "Log out",
  //   path: "/admin/logout",
  //   id: "menu-logout",
  // },
];
