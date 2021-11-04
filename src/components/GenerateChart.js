import { Bar } from 'react-chartjs-2';

export default function GenerateChart({ chartData, title }) {
  return (
    <div id='bar'>
      <Bar
        data={chartData}
        options={{
          animation: true,
          plugins: {
            title: {
              display: true,
              position: 'top',
              text: title, //titre
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
          width: 100%;
          padding: 1rem;
          margin: 0 auto 0 auto;
        }
      `}</style>
    </div>
  );
}
