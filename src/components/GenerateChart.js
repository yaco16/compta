import { Bar } from 'react-chartjs-2';

export default function GenerateChart({ chartData }) {
  console.log('chartData:', chartData);
  return (
    <div id='bar'>
      <Bar
        data={chartData}
        options={{
          animation: true,
          plugins: {
            title: {
              display: true,
              position: 'bottom',
              text: '', //titre
            },
            legend: {
              display: true,
              position: 'bottom',
            },
          },
        }}
      />
      <style jsx>{`
        #bar {
          width: 90%;
          padding: 1rem;
          margin: 0 auto 0 auto;
        }
      `}</style>
    </div>
  );
}
