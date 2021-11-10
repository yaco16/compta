/* eslint-disable react/no-unescaped-entities */
'use strict';

import { useRouter } from 'next/router';
import BarChartVertical from '../../../components/charts/BarVertical';
import DoughnutChart from '../../../components/charts/Doughnut';
import Chart_stackedBars from '../../../components/charts/StackedBars';

export default function TurnOver({ chartData, turnover, activities, stackedTurnover }) {
  const { query } = useRouter();
  const fiscalYear = query.fiscal_year;
  const totalTurnover = parseInt(turnover[0].sum).toLocaleString('fr'); // affichage des nombres format FR : 12 546 €

  return (
    <div>
      <h1>Exercice {fiscalYear}</h1>
      <div className='container-chart'>
        <div className='turnover'>
          Chiffre d'affaires de l'exercice : <span className='turnover-total'>{totalTurnover} €</span>
        </div>
      </div>
      <div className='container-chart'>
        <BarChartVertical chartData={chartData} chartTitle={"Chiffre d'affaires mensuel"} />
      </div>
      <div className='container-chart'>
      <Chart_stackedBars chartData={stackedTurnover} chartTitle={'CA mensuel avec surcoms et cut-off'} />
    </div>
      <div className='container-chart'>
        <DoughnutChart activities={activities} chartTitle={'Répartition du CA par activité'} />
      </div>

      <style jsx>{`
        .container-chart {
          margin-bottom: 1.5rem;
        }
        .turnover {
          font-size: 1.2rem;
        }

        .turnover-total {
          font-weight: bold;
          font-size: 1.3rem;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  //chercher le CA annuel
  const getTurnover = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `get-turnover/:${query.fiscal_year}`);
  const turnover = await getTurnover.json();

  //chercher le CA mensuel
  const data = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'post-monthly-turnover', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
    },
    body: JSON.stringify({ fiscal_year: query.fiscal_year }),
  });
  const chartData = await data.json();
  console.log('chartData:', chartData);

  //chercher les activités
  const fetchActivities = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'turnover-by-activities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
    },
    body: JSON.stringify({ fiscal_year: query.fiscal_year }),
  });
  const fetchedActivities = await fetchActivities.json();
  let activities = [];
  Object.keys(fetchedActivities).forEach((key) => activities.push(fetchedActivities[key][0].sum));

  //stacked bars component
  const getStackedTurnover = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'stacked-turnover', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fiscal_year: query.fiscal_year }),
  });
  const stackedTurnover = await getStackedTurnover.json();

  return {
    props: { chartData, turnover, activities, stackedTurnover },
  };
}
