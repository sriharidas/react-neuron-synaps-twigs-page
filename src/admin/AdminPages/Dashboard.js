import React, { useEffect } from "react";
import { BsClipboardData } from "react-icons/bs";
import { GiOffshorePlatform } from "react-icons/gi";
import { FiLogIn } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import DashboardCharts from "./DashboardCharts";
export default function Dashboard() {
  useEffect(() => {
    // fetch(
    //   "https://neuron-dev.herokuapp.com/aacounts/admin_panel/no_of_API/req/get",
    //   {
    //     method: "post",
    //     body: JSON.stringify({
    //       token:
    //         "b1fcb66fe53d950db11cb04724fca06bad7de457bd6650d61f5c31d77ed8f8e7",
    //     }),
    //   }
    // )
    //   .then((resp) => resp.json())
    //   .then((resp) => console.log(resp));
  }, []);
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
      <DashboardCharts />
    </div>
  );
}
const dashboardData = [
  {
    title: "Amount of Data",
    value: "2,600,000+",
    styles: "dashboard-top-header-left dashboard-top-header-left-1",
    icon: <BsClipboardData />,
  },
  {
    title: "Number of Platforms",
    value: "22+",
    styles: "dashboard-top-header-left dashboard-top-header-left-2",
    icon: <GiOffshorePlatform />,
  },
  {
    title: "Number of users",
    value: "500+",
    styles: "dashboard-top-header-left dashboard-top-header-left-3",
    icon: <FaUsers />,
  },
  {
    title: "Amount of Data",
    value: "2,600,000+",
    styles: "dashboard-top-header-left dashboard-top-header-left-4",
    icon: <FiLogIn />,
  },
];

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
