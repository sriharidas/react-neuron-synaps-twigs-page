import React, { useState, useEffect } from "react";
import "./css/App.css";
import Particles from "react-particles-js";
import particles_params from "./particles";
import logo from "./img/logo.png";
import Signup from "./form/Signup";
import Login from "./form/Login";
import { FaUsers } from "react-icons/fa";
import Dashboard from "./home/Dashboard";
// import { CgLogIn } from "react-icons/cg";
import { BsClipboardData } from "react-icons/bs";
import { GiOffshorePlatform } from "react-icons/gi";
// import { FiLogIn } from "react-icons/fi";
import { VscServerProcess } from "react-icons/vsc";
import { IoIosArrowUp } from "react-icons/io";
import "./css/animation.css";
import Animation from "./animation/Animation";
function App() {
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const [FieldData, setFiledData] = useState("");
  useEffect(() => {
    fetch("https://neuron-dev.herokuapp.com/company_insights_snippets/get", {
      method: "get",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setFiledData(response);
        console.log("state", FieldData);
      });
  }, []);
  const dashboardData = [
    {
      title: "Amount of Data",
      value: FieldData.amount_of_data,
      // styles: "main-section main-section-1",
      styles: "main-section",
      icon: <BsClipboardData />,
    },
    {
      title: "Number of Platforms",
      value: FieldData.no_of_platforms,
      // styles: "main-section main-section-2",
      styles: "main-section",
      icon: <GiOffshorePlatform />,
    },
    {
      title: "Number of users",
      value: FieldData.no_of_users,
      // styles: "main-section main-section-3",
      styles: "main-section",
      icon: <FaUsers />,
    },
    {
      title: "Number of requests",
      value: FieldData.no_of_requests,
      // styles: "main-section main-section-4",
      styles: "main-section",
      icon: <VscServerProcess />,
    },
  ];
  return (
    <>
      <Particles
        params={particles_params}
        // height="inherit"
        style={{ position: "fixed" }}
      />
      <div className="main">
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
        <div className="header-main-container">
          <div className="header-main-content-1">
            <p>World's First AI Based Backend API System For Recommendation</p>
          </div>
          <div className="header-main-content-2">
            <p>World's Second AI Based Backend API System For Suggestion</p>
          </div>
        </div>
        <div className="main-section-group">
          <div className="main-section-cards-1">
            {dashboardData.map((data) => (
              <Dashboard
                title={data.title}
                icon={data.icon}
                values={data.value}
                styles={data.styles}
              />
            ))}
          </div>

          <div className="main-section-2-container">
            <div className="main-section-2-header">
              <span>
                <IoIosArrowUp />
              </span>
            </div>
            <h2 className="main-section-2-title">Why Neuron?</h2>
            <div className="main-section-2-content">
              {/* <div className="main-section-2-cards">Free to use</div>
              <div className="main-section-2-cards">Free to use</div>
              <div className="main-section-2-cards">Free to use</div>
              <div className="main-section-2-cards">Free to use</div>
              <div className="main-section-2-cards">Free to use</div>
              <div className="main-section-2-cards">Free to use</div> */}
              {Menucards2.map((card) => (
                <div className={card.style}>{card.content}</div>
              ))}
            </div>
          </div>
        </div>
        <Animation />
        <Signup open={signup} setState={setSignup} redirect={setLogin} />
        <Login open={login} setState={setLogin} redirect={setSignup} />
      </div>
    </>
  );
}

export default App;

const Menucards2 = [
  {
    content: "Free to use",
    style: "main-section-2-cards main-section-2-cards-1",
  },
  {
    content: "Recommendation for everything",
    style: "main-section-2-cards main-section-2-cards-2",
  },
  {
    content: "Easy to use",
    style: "main-section-2-cards main-section-2-cards-3",
  },
  {
    content: "Powerful AI recommendation",
    style: "main-section-2-cards main-section-2-cards-4",
  },
  {
    content: "Wonderful documentation",
    style: "main-section-2-cards main-section-2-cards-5",
  },
  {
    content: "High Control",
    style: "main-section-2-cards main-section-2-cards-6",
  },
];
