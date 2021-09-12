import React, { useState, useEffect } from "react";
import "./../css/App.css";
import { RiDashboardFill } from "react-icons/ri";
import { FaBrain } from "react-icons/fa";
import { FiLogIn, FiSettings } from "react-icons/fi";
import { BsArrowUp, BsPencilSquare } from "react-icons/bs";
import { AiOutlineClose, AiFillRobot } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function Menu({ state, setState, setTitle }) {
  const [activeLink, setActivateLink] = useState("");
  const [displaySublink, setDisplaySubLink] = useState({});
  const history = useHistory();
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    MenuData.forEach((item) => {
      updateState(item.id, item.subpath);
    });
  }, []);

  useEffect(() => {
    if (activeLink === "") return;
    MenuData.forEach((element) => {
      document.getElementById(element.id).style.cssText =
        "background:inherit;color: inherit";
    });
    document.getElementById(activeLink).style.cssText =
      "background:#3a3aff;color: #fff";
  }, [activeLink]);

  const updateState = (id, sublink) => {
    if (!sublink) return;
    setDisplaySubLink((prevState) => ({ ...prevState, [id]: false }));
  };

  const togglesubLinks = (item) => {
    console.log(item.id, displaySublink[item.id]);
    if (!item.subpath) return;
    setDisplaySubLink((prevState) => ({
      ...prevState,
      [item.id]: !displaySublink[item.id],
    }));
  };

  // const handleHover = (e, operation) => {
  //   console.log(e.target.id);
  //   setHoverLink(e.target.id);
  //   if (hoverLink !== "" && (e.target.id !== "" || e.target.id === undefined))
  //     if (operation === "add")
  //       document.querySelector(`#${e.target.id}`).classList.add("nav-hover");
  //     else
  //       document.querySelector(`#${e.target.id}`).classList.remove("nav-hover");
  // };
  useEffect(() => console.log(displaySublink), [displaySublink]);
  return (
    state && (
      <div className="admin-left-container">
        <div className="admin-left-header">
          Neuron Page
          <button
            // onClick={() => setState(!state)}
            className="admin-header-toggle"
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="admin-left-nav">
          {MenuData.map((item) => {
            // console.log(item.path);
            return (
              <div
                // onMouseOver={(e, props = item) => togglesubLinks(props)}
                // onMouseOut={(e, props = item) => togglesubLinks(props)}
                onClick={(e, props = item) => togglesubLinks(props)}
              >
                <Link
                  className={`admin-left-nav-group ${
                    location.pathname.includes(item.path) ? "nav-active" : ""
                  }`}
                  // onMouseOver={(e) => handleHover(e, "add")}
                  // onMouseOut={(e) => handleHover(e, "remove")}
                  onClick={(e, _props = item) => {
                    history.push(item.path);
                    setTitle(item.title);
                    // setActivateLink(item.id);
                    // togglesubLinks(props);
                  }}
                  // onClick = { (id = item.id, subpath = item.subpath)=>togglesubLinks(id, subpath)}
                  id={item.id}
                >
                  <span className="admin-left-nav-icon">{item.icon}</span>
                  <span className="admin-left-nav-item">{item.title}</span>
                  {item.subpath && Object.keys(item.subpath).length > 0 && (
                    <span
                      className="nav-arrow"
                      onClick={(e, props = item) => togglesubLinks(props)}
                    >
                      <BsArrowUp />
                    </span>
                  )}
                </Link>

                {Object.keys(displaySublink).length &&
                  item.subpath &&
                  displaySublink[item.id] && (
                    <>
                      <div className="admin-left-nav-sublink">
                        {item.subpath.map((link) => (
                          <Link
                            id={link.id}
                            onClick={() => {
                              history.push(`${item.path}${link.path}`);
                              setTitle(link.title);
                            }}
                          >
                            {link.title}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

const MenuData = [
  {
    icon: <RiDashboardFill />,
    title: "Dashboard",
    path: "/admin/",
    id: "menu-dashboard",
  },
  // {
  //   icon: <FaBell />,
  //   title: "Notification",
  //   path: "/admin/notification",
  // },
  // {
  //   icon: <FiDatabase />,
  //   title: "Data Circuit",
  //   path: "/admin/datacircuit",
  //   id: "menu-ai-model",
  // },
  {
    icon: <FaBrain />,
    title: "Ai Schema",
    path: "/admin/ai-schema/synaps",
    id: "menu-ai-schema",
  },
  {
    icon: <AiFillRobot />,
    title: "Gloria",
    path: "/admin/gloria",
    id: "menu-gloria",
    subpath: [
      {
        title: "Auto recommendation",
        path: "/auto-recommendation",
        id: "auto-recommendation",
      },
      { title: "Auto Suggest", path: "/auto-suggest", id: "auto-suggest" },
      { title: "search box", path: "/search-box", id: "search-box" },
    ],
  },
  {
    icon: <AiFillRobot />,
    title: "Sitemap",
    path: "/admin/sitemap",
    id: "menu-sitemap",
    subpath: [
      { title: "view sitemap", path: "/view", id: "sitemap-view" },
      {
        title: "generate sitemap",
        path: "/generate",
        id: "sitemap-generate",
      },
    ],
  },
  {
    icon: <BsPencilSquare />,
    title: "Setup",
    path: "/admin/setup",
    id: "menu-setup",
  },
  {
    icon: <FiSettings />,
    title: "Settings",
    path: "/admin/settings",
    id: "menu-settings",
  },
  // {
  //   icon: <SiFirebase />,
  //   title: "Crashlytics",
  //   path: "/admin/crashlytics",
  // },
  // {
  //   icon: <AiFillSetting />,
  //   title: "Settings",
  //   path: "/admin/settings",
  // },
  // {
  //   icon: <FaUserAlt />,
  //   title: "User Profile",
  //   path: "/admin/userprofile",
  //   id: "menu-userprofile",
  // },

  {
    icon: <FiLogIn />,
    title: "Log out",
    path: "/admin/logout",
    id: "menu-logout",
  },
];
