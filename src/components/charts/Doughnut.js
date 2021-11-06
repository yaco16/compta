import { Doughnut } from 'react-chartjs-2';

export default function Chart_doughnut({ chartData, title }) {
  // labels: ['France 20%', 'France EXO', 'Monaco 20%', 'UE 20%', 'UE EXO', 'Export', 'RRR'],
  const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 8
    }]
  };

  const options = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Doughnut Chart'
        }
      }
    },
  };

  return (
    <div id='doughnut'>
      <Doughnut data={data} options={options} />
      <style jsx>{`
        #doughnut {
          width: 40%;
          padding: 1rem;
          margin: 0 auto 0 auto;
        }
      `}</style>
    </div>
  );
}
