import "./App.css";
import Particles from "react-particles-js";
import particles_params from "./particles";
import logo from "./img/logo.png";

function App() {
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
        </ul>

        <button className="header-btn">Get Authorized</button>
      </div>
      <p className="header-main-content">
        World's First AI Based Backend API System For Recommendation
      </p>
    </div>
  );
}

export default App;
