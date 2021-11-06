import { Bar } from 'react-chartjs-2';
import { months } from './variables';

export default function ChartBarVertical({ chartData, chartTitle }) {

  const data = {
    labels: months,
    datasets: [
      {
        label: "Chiffre d'affaires en €",
        data: chartData,
        backgroundColor: '#0B84A5',
        hoverBackgroundColor: '#1A526C',
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
  return (
    <div id='bar'>
      <Bar data={data} options={options} />
      <style jsx>{`
        #bar {
          width: 100%;
          padding: 1rem;
          margin: 0 auto 0 auto;
        }
      `}</style>
    </div>
  );
}
