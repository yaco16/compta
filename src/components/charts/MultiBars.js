import { Bar } from 'react-chartjs-2';
import { months } from './variables';

export default function Chart_MultiBar({ chartData, chartTitle }) {
  console.log('chartData:', typeof chartData.fy2021[0]);
  const data = {
    labels: months,
    datasets: [
      {
        label: '2019/2020',
        type: 'bar',
        backgroundColor: '#5a189a',
        data: chartData.fy2020,
      },
      {
        label: '2020/2021',
        type: 'bar',
        backgroundColor: '#fb8500',
        data: chartData.fy2021,
      },
      {
        label: '2021/2022',
        type: 'bar',
        backgroundColor: '#168aad',
        data: chartData.fy2022,
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
