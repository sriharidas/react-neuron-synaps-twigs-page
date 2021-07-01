import React from "react";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { IoIosNotifications } from "react-icons/io";
import Dashboard from "./AdminPages/Dashboard";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import DataCircuit from "./AdminPages/DataCircuit";
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
        <Switch>
          <Route exact path="/admin/" component={Dashboard} />
          <Route path="/admin/datacircuit/" component={DataCircuit} />
        </Switch>
        {/* <Dashboard /> */}
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
