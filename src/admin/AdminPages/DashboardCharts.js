import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
export default function DashboardCharts({ url, range, borderColor, label }) {
  const [chartData, setChartData] = useState({
    xData: "",
    yData: "",
  });

  useEffect(() => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem("userToken"),
        range: range,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response) {
          setChartData({
            xData: response["daysList"].reverse(),
            yData: response["APIrqquests"].reverse(),
          });
        }
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
              label: label,
              data: chartData.yData,
              // backgroundColor: ["#f00", "#0f0", "#00f", "#ffc107"],
              fill: false,
              lineTension: 0.2,
              backgroundColor: "rgba(0,0,0)",
              borderColor: borderColor,
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
