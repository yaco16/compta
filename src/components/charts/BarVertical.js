import { Bar } from 'react-chartjs-2';
import { chartMonths, chartColors } from './variables';

export default function ChartBarVertical({ chartData, chartTitle }) {
  const data = {
    labels: chartMonths,
    datasets: [
      {
        label: "Chiffre d'affaires en €",
        data: chartData,
        backgroundColor: chartColors.n,
      },
    ],
  };

  const options = {
    animation: true,
    plugins: {
      title: {
        display: true,
        position: 'top',
        text: chartTitle,
      },
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };
  return <Bar data={data} options={options} />;
}
