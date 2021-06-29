import "./css/App.css";
import Particles from "react-particles-js";
import particles_params from "./particles";
import logo from "./img/logo.png";
import React, { useState } from "react";
import Signup from "./form/Signup";
import Login from "./form/Login";
import { FaUsers } from "react-icons/fa";
import Dashboard from "./home/Dashboard";
// import { CgLogIn } from "react-icons/cg";
import { BsClipboardData } from "react-icons/bs";
import { GiOffshorePlatform } from "react-icons/gi";
import { FiLogIn } from "react-icons/fi";

function App() {
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  return (
    <div className="main">
      <Particles
        params={particles_params}
        height="100vh"
        style={{ position: "fixed" }}
      />
      <div className="header-container">
        <div className="header-logo">
          <img src={logo} alt="logo" />
        </div>

        <ul className="header-nav">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Documentation</a>
          </li>
          {/* <li>
            <a href="#" className="header-btn-1" onClick={() => setLogin(true)}>
              Get Authorized
            </a>
          </li> */}
        </ul>

        <button className="header-btn" onClick={() => setLogin(true)}>
          Get Authorized
        </button>
      </div>
      <p className="header-main-content">
        World's First AI Based Backend API System For Recommendation
      </p>

      <div className="main-section-group">
        {dashboardData.map((data) => (
          <Dashboard
            title={data.title}
            icon={data.icon}
            values={data.value}
            styles={data.styles}
          />
        ))}
      </div>
      <Signup open={signup} setState={setSignup} redirect={setLogin} />
      <Login open={login} setState={setLogin} redirect={setSignup} />
    </div>
  );
}

export default App;

const dashboardData = [
  {
    title: "Amount of Data",
    value: "2,600,000+",
    // styles: "main-section main-section-1",
    styles: "main-section",
    icon: <BsClipboardData />,
  },
  {
    title: "Number of Platforms",
    value: "22+",
    // styles: "main-section main-section-2",
    styles: "main-section",
    icon: <GiOffshorePlatform />,
  },
  {
    title: "Number of users",
    value: "500+",
    // styles: "main-section main-section-3",
    styles: "main-section",
    icon: <FaUsers />,
  },
  {
    title: "Amount of Data",
    value: "2,600,000+",
    // styles: "main-section main-section-4",
    styles: "main-section",
    icon: <FiLogIn />,
  },
];
