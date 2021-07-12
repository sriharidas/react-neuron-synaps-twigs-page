import React, { useState, useEffect } from "react";
import "./css/App.css";
import Particles from "react-particles-js";
import particles_params from "./particles";
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
import HomeHeader from "./home/HomeHeader";
function App() {
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const [FieldData, setFiledData] = useState("");
  const [scrollEffect, setScrollEffect] = useState(false);
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
  useEffect(() => {
    if (document.querySelector(".main-section-2-contaiener") !== undefined) {
      const cards_2 = document.querySelector(".main-section-2-container");
      const MainHeader2 = document.querySelector(".main-section-2-header");
      const MainContainer = document.querySelector(".main-section-2-container");
      window.addEventListener("scroll", () => {
        if (cards_2.offsetTop + window.innerHeight / 4 <= window.scrollY) {
          document.querySelector(".main-section-2-header-nav").style.display =
            "block";
          document.querySelector(".main-section-2-header").style.display =
            "none";
        } else {
          document.querySelector(".main-section-2-header-nav").style.display =
            "none";
          document.querySelector(".main-section-2-header").style.display =
            "flex";
        }
      });

      window.addEventListener("mousewheel", () => {
        if (scrollEffect && MainContainer.style.position !== "relative") {
          MainContainer.style = "animation:ScrollDownEffect 2.5s ease-in-out";
          setTimeout(() => {
            MainContainer.style = "position:relative;";
            setScrollEffect(false);
          }, 2500);
        }
      });

      MainHeader2.addEventListener("click", () => {
        // document.getElementById("scrollArrow").href =
        //   "#main-section-2-container";
        document.querySelector(".main-section-2-header-nav").style.display =
          "block";
        MainContainer.style =
          "position:fixed; z-index: 100 ; animation: ScrollUpEffect 2.5s ease-in-out";
        setTimeout(() => {
          MainContainer.style = "position: fixed;top:0;";
          setScrollEffect(true);
        }, 2500);
      });
    }
  });
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
          <div
            className="main-section-2-container"
            id="main-section-2-container"
          >
            <div className="main-section-2-header-nav">
              <HomeHeader setLogin={setLogin} />
            </div>

            <div className="main-section-2-header">
              <span>
                <a id="scrollArrow">
                  <IoIosArrowUp />
                </a>
              </span>
            </div>
            <h2 className="main-section-2-title">Why Neuron?</h2>
            <div className="main-section-2-content">
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
