import { Bar } from 'react-chartjs-2';
import {chartColors3fy, chartOptions} from './variables';

export default function ChartBarHorizontal({turnover}) {
  const data = {
    type: 'bar',
    labels: [' '], //label axe y
    datasets: [
      {
        label: ['Exercice 2019/2020'],
        data: [turnover.fy2020],
        backgroundColor: chartColors3fy.n_2,
      },
      {
        label: 'Exercice 2020/2021',
        data: [turnover.fy2021],
        backgroundColor: chartColors3fy.n_1,
      },
      {
        label: 'Exercice 2021/2022',
        data: [turnover.fy2022],
        backgroundColor: chartColors3fy.n,
      }
    ],
  };

  const options = {
    indexAxis: 'y',

    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'CA Annuel',
        font: {
          size: chartOptions.titleSize,
      },
      },
    },
  };

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
}
