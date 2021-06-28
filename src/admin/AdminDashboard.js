import React from "react";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
export default function AdminDashboard() {
  return (
    <div className="admin-right-container">
      <div className="admin-right-header">
        <div className="admin-right-header-title">Dashboard</div>
        <div className="admin-right-header-right">
          <input placeholder="search" />
          <button className="search">
            <AiOutlineSearch />
          </button>
          <button className="dashboard">
            <RiDashboardFill />
          </button>
          <button className="notification">
            <IoIosNotifications />
          </button>
          <button className="profile">
            <AiOutlineUser />
          </button>
        </div>
      </div>
    </div>
  );
}
