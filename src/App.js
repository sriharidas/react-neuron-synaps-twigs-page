import React, { useState, useEffect } from "react";
import "./css/App.css";
import Particles from "react-particles-js";
import particles_params from "./particles";
import Signup from "./form/Signup";
import Login from "./form/Login";
import { FaOtter, FaUsers } from "react-icons/fa";
import Dashboard from "./home/Dashboard";
// import { CgLogIn } from "react-icons/cg";
import { BsClipboardData } from "react-icons/bs";
import { GiOffshorePlatform } from "react-icons/gi";
// import { FiLogIn } from "react-icons/fi";
import { VscServerProcess } from "react-icons/vsc";
import "./css/animation.css";
import Animation from "./animation/Animation";
import HomeHeader from "./home/HomeHeader";
import WhyNeuron from "./home/WhyNeuron";
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
        <HomeHeader setLogin={setLogin} />
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
          <WhyNeuron setLogin={setLogin} />
        </div>
        <Animation />
        <Signup open={signup} setState={setSignup} redirect={setLogin} />
        <Login open={login} setState={setLogin} redirect={setSignup} />
      </div>
    </>
  );
}

export default App;
