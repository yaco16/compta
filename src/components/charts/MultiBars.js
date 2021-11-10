import { Bar } from 'react-chartjs-2';
import { chartMonths, chartColors3fy, chartOptions } from './variables';

export default function Chart_MultiBar({ chartData, chartTitle }) {
  const data = {
    labels: chartMonths,
    datasets: [
      {
        label: '2019/2020',
        type: 'bar',
        backgroundColor: chartColors3fy.n_2,
        data: chartData.fy2020
      },
      {
        label: '2020/2021',
        type: 'bar',
        backgroundColor: chartColors3fy.n_1,
        data: chartData.fy2021
      },
      {
        label: '2021/2022',
        type: 'bar',
        backgroundColor: chartColors3fy.n,
        data: chartData.fy2022
      },
    ],
  };

  const options = {
    animation: true,
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: {
        display: true,
        text: chartTitle,
        font: {
          size: chartOptions.titleSize,
      },
      },
    },
  };
  return (
    <div id='bar'>
      <Bar data={data} options={options} />
      <style jsx>{`
        #bar {
          width: 100%;
          margin: 0 auto 0 auto;
        }
      `}</style>
    </div>
  );
}
