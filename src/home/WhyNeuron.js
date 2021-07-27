import React, { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import { IoIosArrowUp } from "react-icons/io";
import { RiArrowLeftSLine } from "react-icons/ri";

export default function WhyNeuron({ setLogin }) {
  const [scrollEffect, setScrollEffect] = useState(false);

  useEffect(() => {
    if (document.querySelector(".main-section-2-contaiener") !== undefined) {
      const cards_2 = document.querySelector(".main-section-2-container");
      const MainHeader2 = document.querySelector(".main-section-2-header");
      const MainContainer = document.querySelector(".main-section-2-container");
      const MainContentWrapper = document.querySelector(
        ".main-section-2-content-wrapper"
      );
      const MainContentBackbtn = document.querySelector(
        ".main-section-2-back-btn "
      );
      const cardsList = Array(
        document.querySelectorAll(".main-section-2-cards")
      );
      const cardsArray = cardsList[0];

      // console.log(cardsArray.length);

      cardsList.map((element) => {
        console.log("element", element.length);
        for (let i = 0; i < element.length; i++) {
          // console.log("element", element[i]);
          element[i].addEventListener("mouseover", () => {
            // console.log("hovering", element[i]);
            element[i].innerHTML = Menucards2[i].hoverContent;
          });
          element[i].addEventListener("mouseout", () => {
            // console.log("hovering", element[i]);
            element[i].innerHTML = Menucards2[i].content;
          });
        }
      });

      //   window.addEventListener("mousewheel", (e) => {
      // setTimeout(() => {
      // console.log(scrollEffect);
      // if (e.wheelDelta < 0) {
      //   document.querySelector(".main-section-2-header-nav").style.display =
      //     "block";
      //   MainContainer.style =
      //     "position:fixed; z-index: 100 ; animation: ScrollUpEffect 1s ease-in-out";
      //   setTimeout(() => {
      //     MainContainer.style = "position: fixed;top:0;";
      //     setScrollEffect(true);
      //   }, 1000);
      // }

      // if (scrollEffect && e.wheelDelta > 0) {
      //   MainContainer.style = "animation:ScrollDownEffect 1s ease-in-out";
      //   setTimeout(() => {
      //     MainContainer.style = "position:relative;";
      //     setScrollEffect(false);
      //   }, 1000);
      // }
      // });
      //   });
      document.addEventListener("scroll", () => {
        if (MainContainer.style.position === "fixed") {
          // console.log(window.scrollY <= MainContainer.offsetHeight);
          // console.log("scroll events");
          MainContainer.style.top = -window.scrollY + "px";
        }
      });
      MainContentBackbtn.addEventListener("click", () => {
        MainContainer.style =
          "position:fixed; z-index: 100 ; animation: ScrollDownEffect 0.75s ease-in-out";
        setTimeout(() => {
          MainContentWrapper.style.display = "none";
          MainContainer.style = "position: relative;top:0px;";
        }, 750);
      });
      MainHeader2.addEventListener("click", () => {
        // document.getElementById("scrollArrow").href =
        //   "#main-section-2-container";
        document.querySelector(".main-section-2-header-nav").style.display =
          "block";
        MainContentWrapper.style.display = "block";
        MainContainer.style =
          "position:fixed; z-index: 100 ; animation: ScrollUpEffect 0.5s ease-in-out";
        setTimeout(() => {
          MainContainer.style = "position: fixed;top:0;";
          setScrollEffect(true);
        }, 500);
      });
    }
  });
  return (
    <div className="main-section-2-container" id="main-section-2-container">
      <div className="main-section-2-header">
        <span className="arrow-icon">
          <a id="scrollArrow">
            <IoIosArrowUp />
          </a>
        </span>
        <span>why neuron?</span>
      </div>
      <div className="main-section-2-content-wrapper">
        <span className="main-section-2-back-btn">
          <a href="#">
            <RiArrowLeftSLine />
          </a>
        </span>
        <div className="main-section-2-header-nav">
          <HomeHeader setLogin={setLogin} />
        </div>

        <h2 className="main-section-2-title">Why Neuron?</h2>
        <div className="main-section-2-content">
          {Menucards2.map((card) => (
            <div className={card.style}>{card.content}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Menucards2 = [
  {
    content: "Free to use",
    hoverContent: "This is a content displays on mousehover",
    style: "main-section-2-cards main-section-2-cards-1",
  },
  {
    content: "Recommendation for everything",
    hoverContent: "This is a content displays on mousehover",
    style: "main-section-2-cards main-section-2-cards-2",
  },
  {
    content: "Easy to use",
    hoverContent: "This is a content displays on mousehover",
    style: "main-section-2-cards main-section-2-cards-3",
  },
  {
    content: "Powerful AI recommendation",
    hoverContent: "This is a content displays on mousehover",
    style: "main-section-2-cards main-section-2-cards-4",
  },
  {
    content: "Wonderful documentation",
    hoverContent: "This is a content displays on mousehover",
    style: "main-section-2-cards main-section-2-cards-5",
  },
  {
    content: "High Control",
    hoverContent: "This is a content displays on mousehover",

    style: "main-section-2-cards main-section-2-cards-6",
  },
];
