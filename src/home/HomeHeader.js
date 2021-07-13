import React from "react";
import logo from "./../img/logo.png";
import { useHistory } from "react-router";
export default function HomeHeader({ setLogin }) {
  const history = useHistory();
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
          <a href="#" onClick={() => history.push("/documentation")}>
            Documentation
          </a>
        </li>
      </ul>
      <div className="header-btn-grp">
        <button
          className="header-btn header-btn-1"
          onClick={() => setLogin(true)}
        >
          Demo Sites
        </button>
        <button
          className="header-btn header-btn-2"
          onClick={() => setLogin(true)}
        >
          Get Authorized
        </button>
      </div>
    </div>
  );
}
