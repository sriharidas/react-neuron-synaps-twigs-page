import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
export default function DashboardCharts() {
  const [chartData, setChartData] = useState({
    xData: "",
    yData: "",
  });

  useEffect(() => {
    fetch(
      "https://neuron-dev.herokuapp.com/accounts/admin_panel/no_of_API_req_graph/get_data",
      {
        method: "POST",
        body: JSON.stringify({
          token: 12345,
          range: 7,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setChartData({
          xData: response["daysList"].reverse(),
          yData: response["APIrequests"].reverse(),
        });
      });
  }, []);

  return (
    <div className="dashboard-chart-container">
      <Line
        data={{
          labels: chartData.xData,
          datasets: [
            {
              // label: "Growth",
              label: "Number of api Requests",
              data: chartData.yData,
              // backgroundColor: ["#f00", "#0f0", "#00f", "#ffc107"],
              fill: false,
              lineTension: 0.2,
              backgroundColor: "rgba(0,0,0)",
              borderColor: "rgba(0,0,255,0.4)",
            },
          ],
          options: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: "abc",
            },
          },
        }}
        className="dashboard-chart"
      />
    </div>
  );
}
