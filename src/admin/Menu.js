import React from "react";
import "./../css/App.css";
import { RiDashboardFill } from "react-icons/ri";
import { FaUserAlt, FaBell } from "react-icons/fa";
import { MdContentPaste } from "react-icons/md";
import { GrCopy } from "react-icons/gr";
import { RiUserAddLine } from "react-icons/ri";
import { SiGooglemaps } from "react-icons/si";
export default function Menu() {
  return (
    <div className="admin-left-container">
      <div className="admin-left-header">Neuron Page</div>
      <div className="admin-left-nav">
        {MenuData.map((item) => (
          <div className="admin-left-nav-group">
            <span className="admin-left-nav-icon">{item.icon}</span>
            <div className="admin-left-nav-item">{item.title}</div>
          </div>
        ))}
        {/* <div className="admin-left-nav-group">
          <span className="admin-left-nav-icon">
            <BsFillPersonFill />
          </span>
          <div className="admin-left-nav-item">Dashboard</div>
        </div>

        <div className="admin-left-nav-group">
          <span className="admin-left-nav-icon">
            <BsFillPersonFill />
          </span>
          <div className="admin-left-nav-item">Dashboard</div>
        </div>
        <div className="admin-left-nav-group">
          <span className="admin-left-nav-icon">
            <BsFillPersonFill />
          </span>
          <div className="admin-left-nav-item">Dashboard</div>
        </div>
        <div className="admin-left-nav-group">
          <span className="admin-left-nav-icon">
            <BsFillPersonFill />
          </span>
          <div className="admin-left-nav-item">Dashboard</div>
        </div>
        <div className="admin-left-nav-group">
          <span className="admin-left-nav-icon">
            <BsFillPersonFill />
          </span>
          <div className="admin-left-nav-item">Dashboard</div>
        </div>
        <div className="admin-left-nav-group">
          <span className="admin-left-nav-icon">
            <BsFillPersonFill />
          </span>
          <div className="admin-left-nav-item">Dashboard</div>
        </div> */}
      </div>
    </div>
  );
}

const MenuData = [
  {
    icon: <RiDashboardFill />,
    title: "Dashboard",
  },
  {
    icon: <FaUserAlt />,
    title: "User Profile",
  },
  {
    icon: <MdContentPaste />,
    title: "Table List",
  },
  {
    icon: <GrCopy />,
    title: "Typography",
  },
  {
    icon: <RiUserAddLine />,
    title: "Icons",
  },
  {
    icon: <SiGooglemaps />,
    title: "Maps",
  },
  {
    icon: <FaBell />,
    title: "Notification",
  },
];
