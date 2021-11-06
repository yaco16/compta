import { Bar } from 'react-chartjs-2';

export default function ChartBarHorizontal({chartData}) {
  console.log('chartData1:', chartData.fy2020);
  const data = {
    type: 'bar',
    labels: [' '],
    datasets: [
      {
        label: ['Exercice 2019/2020'],
        data: [chartData.fy2020],
        backgroundColor: '#0087B0',
      },
      {
        label: 'Exercice 2020/2021',
        data: [chartData.fy2021],
        backgroundColor: '#1ABC9C',
      },
      {
        label: 'Exercice 2021/2022',
        data: [chartData.fy2022],
        backgroundColor: '#F39C12',
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
