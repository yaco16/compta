import {chartMonths, chartOptions} from './variables';
import { Bar } from 'react-chartjs-2';

const chartColors = ['#336699', '#99CCFF', '#999933', '#666699', '#CC9933', '#006666', '#3399FF', '#993300', '#CCCC99', '#666666'];


export default function Chart_stackedBars({ chartData, chartTitle }) {
  console.log('chartData:', chartData);
  const data = {
    labels: chartMonths,
    datasets: [
      {
        label: 'Surcoms',
        data: chartData.surcomsData,
        backgroundColor: chartColors[0],
      },
      {
        label: 'Cut-off',
        data: chartData.cutoffData,
        backgroundColor: chartColors[1],
      },
      {
        label: 'CA',
        data: chartData.monthlyTurnoverData,
        backgroundColor: chartColors[2],
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
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    };

  return (
    <div id='bar'>
      <Bar data={data} options={options}/>
      <style jsx>{`
        #bar {
          width: 100%;
          margin: 0 auto 0 auto;
        }
      `}</style>
    </div>
  );
}