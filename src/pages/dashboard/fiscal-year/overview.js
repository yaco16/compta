import MultiBarsChart from '../../../components/charts/MultiBars';
import ChartBarHorizontal from '../../../components/charts/BarHorizontal';

export default function Overview({ chartData }) {
  console.log('chartData:', chartData);
  return (
    <>
      <h1>Comparatif</h1>
      <div className='barH'>
        <ChartBarHorizontal turnover={chartData.totalTurnover} />
      </div>
      <MultiBarsChart turnoverByMonth={chartData.turnoverByMonth} chartTitle={'Récap des 3 derniers exercices'} />
      <style jsx>{`
        .barH {
          width: 60%;
          margin: 0 auto 0 auto;
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps() {
  let chartData;
  //chart 1
  const fiscalYears = [2020, 2021, 2022];
  const response1 = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'compare-fiscal-years', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
    },
    body: JSON.stringify({
      fiscalYears,
    }),
  });

  const result = await response1.json();

  const fy2020 = result.turnover1[0].sum;
  const fy2021 = result.turnover2[0].sum;
  const fy2022 = result.turnover3[0].sum;

  chartData = {
    totalTurnover: {
      fy2020,
      fy2021,
      fy2022,
    },
  };

  //chart 2
  const response2 = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'post-monthly-turnover', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
    },
    body: JSON.stringify({
      year1: '21',
      year2: '22',
    }),
  });

  const fetchFy2022 = await response2.json();

  const response3 = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'post-monthly-turnover', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
    },
    body: JSON.stringify({
      year1: '20',
      year2: '21',
    }),
  });

  const fetchFy2021 = await response3.json();

  const response4 = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'post-monthly-turnover', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
    },
    body: JSON.stringify({
      year1: '19',
      year2: '20',
    }),
  });

  const fetchFy2020 = await response4.json();

  chartData = { ...chartData, turnoverByMonth: { fy2020: fetchFy2020, fy2021: fetchFy2021, fy2022: fetchFy2022 } };

  return {
    props: { chartData },
  };
}
