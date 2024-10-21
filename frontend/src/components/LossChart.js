import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,   // This is for the x-axis (categorical scale)
  LinearScale,     // This is for the y-axis (linear scale)
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function LossChart({ losses }) {
  const data = {
    labels: losses.map((_, index) => index + 1),  // X-axis is epochs
    datasets: [
      {
        label: 'Loss',
        data: losses,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Epoch',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Loss',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default LossChart;
