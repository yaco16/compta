import { Bar } from 'react-chartjs-2';
import {chartColors} from './variables';


export default function ChartBarHorizontal({turnover}) {
  console.log('color:', chartColors.n_2)
  const data = {
    type: 'bar',
    labels: [' '], //label axe y
    datasets: [
      {
        label: ['Exercice 2019/2020'],
        data: [turnover.fy2020],
        backgroundColor: chartColors.n_2,
      },
      {
        label: 'Exercice 2020/2021',
        data: [turnover.fy2021],
        backgroundColor: chartColors.n_1,
      },
      {
        label: 'Exercice 2021/2022',
        data: [turnover.fy2022],
        backgroundColor: chartColors.n,
      }
    ],
  };
  console.log('dataset:', data.datasets[0].backgroundColor)

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
        position: 'right',
      },
      title: {
        display: true,
        text: 'CA Annuel',
      },
    },
  };

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
}
