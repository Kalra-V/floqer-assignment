import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

const LineGraph = ({ data }) => {
  const chartData = {
    labels: [2020, 2021, 2022, 2023, 2024],
    datasets: [
      {
        data: data.chartData,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: data.mainTitle,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: data.xTitleText,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: data.yTitleText,
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineGraph;
