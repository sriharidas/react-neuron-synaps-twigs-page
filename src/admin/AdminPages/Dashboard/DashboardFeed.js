import React, { useEffect, useState } from "react";
import { BiTrendingUp } from "react-icons/bi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
export default function DashboardFeed() {
  const [feedData, setFedData] = useState("");
  useEffect(() => {
    fetch(
      "https://neuron-dev.herokuapp.com/accounts/admin_panel/trending_customers_table/get_data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("userToken"),
          range: 7,
        }),
      }
    )
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("Trending", resp);
        setFedData(resp["trending_customers"]);
        console.log("state", feedData);
      });
  }, []);
  return (
    <div className="dashboard-feed-container">
      {feedData === "" ? (
        <div className="dashboard-feed-nodata">
          <p>
            <span>
              <AiOutlineEyeInvisible />
            </span>
            No data to display
          </p>
        </div>
      ) : (
        <>
          <h2 className="dashboard-feed-main-title">
            <span className="dashboard-feed-icon">
              <BiTrendingUp />
            </span>
            Trending Customers
          </h2>
          <table>
            <thead>
              {/* {feedData.map((data) => (
            <tr>
              <th>{data}</th>
            </tr>
          ))} */}
              <tr>
                <th>S.No</th>
                <th>UID</th>
                <th>Requests</th>
              </tr>
            </thead>
            <tbody>
              {feedData.map((row, index) => (
                <tr>
                  <td>{index + 1}</td>
                  {row.map((data) => {
                    console.log("map", data);
                    return <td>{data}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
