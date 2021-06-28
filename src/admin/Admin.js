import React from "react";
import "./../css/App.css";
import AdminDashboard from "./AdminDashboard";
import Menu from "./Menu";
export default function Admin() {
  return (
    <div className="admin-container">
      <Menu />
      <AdminDashboard />
    </div>
  );
}
