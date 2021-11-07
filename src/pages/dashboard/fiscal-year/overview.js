'use strict';

import MultiBarsChart from '../../../components/charts/MultiBars';
import ChartBarHorizontal from '../../../components/charts/BarHorizontal';
import cumulativeTurnover from '../../../services/cumulativeTurnover';

export default function Overview({ chartData }) {
  return (
    <>
      <h1>Comparatif</h1>
      <h2 className="category">1. Chiffre d'affaires</h2>
      <div className='container-chart'>
        <div className='barH'>
          <ChartBarHorizontal turnover={chartData.totalTurnover} />
        </div>
      </div>

      <div className='container-chart'>
        <MultiBarsChart chartData={chartData.turnoverByMonth} chartTitle={'3 derniers exercices par mois'} />
      </div>


      <div className='container-chart'>
        <MultiBarsChart chartData={chartData.cumulativeTurnover} chartTitle={'3 derniers exercices par mois cumulé'} />
      </div>
      <h2 className='category'>2. Masse salariale</h2>
      <style jsx>{`
        .category {
          font-size: 1.2rem;
          font-weight: bold;
        }

        .container-chart {
          margin-bottom: 0.3rem;
        }

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

  //chart 3
  const cumulativeTurnover2020 = cumulativeTurnover(fetchFy2020);
  const cumulativeTurnover2021 = cumulativeTurnover(fetchFy2021);
  const cumulativeTurnover2022 = cumulativeTurnover(fetchFy2022);

  chartData = { ...chartData, cumulativeTurnover: {fy2020: cumulativeTurnover2020, fy2021: cumulativeTurnover2021, fy2022: cumulativeTurnover2022}};

  return {
    props: { chartData },
  };
}
