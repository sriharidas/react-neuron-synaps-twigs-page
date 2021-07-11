import React, { useState, useEffect } from "react";
import "./../css/App.css";
import AdminDashboard from "./AdminDashboard";
import Menu from "./Menu";
export default function Admin() {
  const [menu, setMenu] = useState(true);
  const [title, SetTitle] = useState("Dashboard");
  // alert(window.innerWidth);
  window.addEventListener("resize", () => {
    window.innerWidth >= 840 ? setMenu(true) : setMenu(false);
    // setMenu(false);
  });
  useEffect(() => {
    if (window.innerWidth >= 840) {
      if (!menu) {
        document.querySelector(".admin-right-container").style = {
          width: "100%",
          marginLeft: "0",
        };
      } else {
        document.querySelector(".admin-right-container").style.marginLeft =
          "300px";
      }
    } else {
      document.querySelector(".admin-right-container").style = {
        width: "100%",
        marginLeft: "0",
      };
    }
  });
  return (
    <div className="admin-container">
      <Menu state={menu} setState={setMenu} setTitle={SetTitle} />
      <AdminDashboard state={menu} setState={setMenu} Title={title} />
    </div>
  );
}
