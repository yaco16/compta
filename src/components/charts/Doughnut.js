import { Doughnut } from 'react-chartjs-2';
import { destinationLabels, chartOptions } from './variables';

const chartColors = ['#336699', '#99CCFF', '#999933', '#666699', '#CC9933', '#006666', '#3399FF', '#993300', '#CCCC99', '#666666'];

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
