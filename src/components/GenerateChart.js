import { Bar } from 'react-chartjs-2';

export default function GenerateChart({ chartData }) {
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
              text: 'Cryptocurrency prices',
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
          width: 50%;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}
