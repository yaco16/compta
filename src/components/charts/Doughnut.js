import { Doughnut } from 'react-chartjs-2';
import { destinationLabels, chartOptions, chartColors } from './variables';

export default function Chart_doughnut({ destinations, chartTitle }) {
  const data = {
    labels: destinationLabels,
    datasets: [
      {
        data: destinations,
        backgroundColor: chartColors,
        hoverOffset: 15,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      title: {
        display: true,
        text: chartTitle,
        font: {
          size: chartOptions.titleSize,
      },
      },
      responsive: true,
      animation: {
        animateScale: true,
      },
    },
  };

  return (
    <div id='doughnut'>
      <Doughnut data={data} options={options} width={20}/>
      <style jsx>{`
        #doughnut {
          width: 45%;
          margin: 0 auto 0 auto;
        }
      `}</style>
    </div>
  );
}
