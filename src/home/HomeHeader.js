import React from "react";
import logo from "./../img/logo.png";

export default function HomeHeader({ setLogin }) {
  return (
    <div className="header-container">
      <div className="header-logo">
        <img src={logo} alt="logo" />
      </div>

      <ul className="header-nav">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#" style={{ cursor: "not-allowed" }} disabled>
            Documentation
          </a>
        </li>
      </ul>

      <button className="header-btn" onClick={() => setLogin(true)}>
        Get Authorized
      </button>
    </div>
  );
}
