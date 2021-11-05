import { Doughnut } from 'react-chartjs-2';

export default function Chart_doughnut({ chartData, title }) {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  };
  const options = {
    tooltips: {
      callbacks: {
        title: 'titre',
        },
        label: function(tooltipItem, data) {
          return data['datasets'][0]['data'][tooltipItem['index']];
        },
        afterLabel: function(tooltipItem, data) {
          var dataset = data['datasets'][0];
          var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100)
          return '(' + percent + '%)';
        }
      },
      backgroundColor: '#FFF',
      titleFontSize: 16,
      titleFontColor: '#0066ff',
      bodyFontColor: '#000',
      bodyFontSize: 14,
      displayColors: false
    }
  

  return (
    <div id='doughnut'>
      <Doughnut
        data={data}
        options={options}
      />
      <style jsx>{`
        #doughnut {
          width: 100%;
          padding: 1rem;
          margin: 0 auto 0 auto;
        }
      `}</style>
    </div>
  );
}
