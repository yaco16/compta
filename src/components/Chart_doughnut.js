import { Doughnut } from 'react-chartjs-2';

export default function Chart_doughnut({ chartData, title }) {
  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    type: 'doughnut',
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Chart.js Doughnut Chart',
          position: 'bottom'
        },
      },
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
