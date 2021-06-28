import React from "react";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { BsClipboardData } from "react-icons/bs";
import { GiOffshorePlatform } from "react-icons/gi";
import { FiLogIn } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";

export default function AdminDashboard({ state, setState }) {
  return (
    <div className="admin-right-container">
      <div className="admin-right-header">
        <div className="admin-right-header-title">
          <button
            className="admin-header-toggle"
            onClick={() => setState(!state)}
          >
            <FiMenu />
          </button>
          Dashboard
        </div>
        <div className="admin-right-header-right">
          <input placeholder="search" />
          {nav.map((item) => (
            <button className={item.style}>{item.icon}</button>
          ))}
        </div>
      </div>

      <div className="admin-right-main">
        <div className="admin-right-dashboard-top">
          {dashboardData.map((data) => (
            <div className="dashboard-top-header">
              <div className={data.styles}>{data.icon}</div>
              <div className="dashboard-top-header-right">
                <div className="dashboard-top-title ">{data.title}</div>
                <div className="dashboard-top-value">{data.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const nav = [
  {
    style: "search",
    icon: <AiOutlineSearch />,
  },

  {
    style: "notification",
    icon: <IoIosNotifications />,
  },
  {
    style: "profile",
    icon: <AiOutlineUser />,
  },
];
const dashboardData = [
  {
    title: "Amount of Data",
    value: "2,600,000+",
    styles: "dashboard-top-header-left dashboard-top-header-left-1",
    icon: <BsClipboardData />,
  },
  {
    title: "Number of Platforms",
    value: "22+",
    styles: "dashboard-top-header-left dashboard-top-header-left-2",
    icon: <GiOffshorePlatform />,
  },
  {
    title: "Number of users",
    value: "500+",
    styles: "dashboard-top-header-left dashboard-top-header-left-3",
    icon: <FaUsers />,
  },
  {
    title: "Amount of Data",
    value: "2,600,000+",
    styles: "dashboard-top-header-left dashboard-top-header-left-4",
    icon: <FiLogIn />,
  },
];
