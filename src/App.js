import "./css/App.css";
import Particles from "react-particles-js";
import particles_params from "./particles";
import logo from "./img/logo.png";
import React, { useState } from "react";
import Signup from "./form/Signup";
import Login from "./form/Login";

function App() {
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  return (
    <div className="main">
      <Particles params={particles_params} height="100vh" />
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
          <li>
            <a href="#" className="header-btn-1" onClick={() => setLogin(true)}>
              Get Authorized
            </a>
          </li>
        </ul>

        {/* <button className="header-btn" onClick={() => setsignup(false)}>
          Get Authorized
        </button> */}
      </div>
      <p className="header-main-content">
        World's First AI Based Backend API System For Recommendation
      </p>
      <Signup open={signup} setState={setSignup} redirect={setLogin} />
      <Login open={login} setState={setLogin} redirect={setSignup} />
    </div>
  );
}

export default App;
