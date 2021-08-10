import React, { useEffect, useState } from "react";
import { BsClipboardData } from "react-icons/bs";
import { GiOffshorePlatform } from "react-icons/gi";
import { FiLogIn } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import DashboardCharts from "./DashboardCharts";
import DashboardFeed from "./DashboardFeed";
export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    noOfRequests: "",
    noOfCustomers: "",
    noOfCountries: "",
    NoofMoviesyouhave: "",
  });
  useEffect(() => {
    fetch(
      "https://neuron-dev.herokuapp.com/accounts/admin_panel/no_of_API_req/get",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // token:
          //   "c81e04cd58af886fecf097728764819364ff9138730e4b791841e2b06f9196e3",
          token: localStorage.getItem("userToken"),
          // token: 12345,
        }),
      }
    )
      .then((resp) => resp.json())
      .then((resp) => {
        setDashboard({
          noOfCountries: resp["noOfCountries"],
          noOfCustomers: resp["noOfCustomers"],
          noOfRequests: resp["noOfRequests"],
          NoofMoviesyouhave: resp["No.of.data.you.have"],
        });
      });
  }, []);
  const dashboardData = [
    {
      title: "Number of requests",
      // value: dashboard.noOfRequests,
      value: 150,

      styles: "dashboard-top-header-left dashboard-top-header-left-1",
      icon: <BsClipboardData />,
    },
    {
      title: "Number of Customers",
      value: 25,
      // value: dashboard.noOfCountries,
      styles: "dashboard-top-header-left dashboard-top-header-left-2",
      icon: <GiOffshorePlatform />,
    },
    {
      title: "Number of Countries",
      // value: dashboard.noOfCustomers,
      value: 16,

      styles: "dashboard-top-header-left dashboard-top-header-left-3",
      icon: <FaUsers />,
    },
    {
      title: "No.of Synaps you have",
      // value: dashboard.NoofMoviesyouhave,
      value: 12,
      styles: "dashboard-top-header-left dashboard-top-header-left-4",
      icon: <FiLogIn />,
    },
  ];
  return (
    <div className="admin-right-dashboard-top">
      {dashboardData.map((data) => (
        <div className="dashboard-top-header">
          <div className={data.styles}>{data.icon}</div>
          <div className="dashboard-top-header-right">
            <div className="dashboard-top-title ">{data.title}</div>
            <div className="dashboard-top-value">{data.value}</div>
          </div>
        </div>
      ))}
      <div className="dashboard-chart-grid-container">
        <h2 className="dashboard-chart-grid-title">Requests</h2>
        <div className="dashboard-chart-grid">
          <DashboardCharts
            url={
              "https://neuron-dev.herokuapp.com/accounts/admin_panel/no_of_API_req_graph/get_data"
            }
            range={7}
            borderColor={"#3a3aff88"}
            label={"Number of api Requests"}
            title="Number of Api Requests"
          />
          <DashboardCharts
            url={
              "https://neuron-dev.herokuapp.com/accounts/admin_panel/no_of_customers_req_graph/get_data"
            }
            range={7}
            borderColor={"#3aff3a88"}
            label={"Number of customers Requests"}
            title="Number of Customers"
          />
        </div>
      </div>

      <div className="dashboard-feed">
        <h2 className="dashboard-primary-title ">Trending</h2>
        <div className="dashbaord-feed-wrapper">
          <DashboardFeed />
          {/* <DashboardFeed /> */}
        </div>
      </div>
    </div>
  );
}

/* 

user profile
settings
dash
log out
data cir
notification
crash 
*/

/* 
dash 
notic
data cir
crash
sett
user profil
logou
*/
