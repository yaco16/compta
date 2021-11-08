/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import BarChartVertical from '../../../components/charts/BarVertical';
import DoughnutChart from '../../../components/charts/Doughnut'

export default function TurnOver({ chartData, turnover }) {
  const {query} = useRouter();
  const fiscalYear = query.fiscal_year;
  const totalTurnover = parseInt(turnover[0].sum).toLocaleString('fr'); // affichage des nombres format FR : 12 546 €

  return (
    <div>
      <h1>Exercice {fiscalYear}</h1>

      <div className="turnover">Chiffre d'affaires de l'exercice : <span className="turnover-total">{totalTurnover} €</span></div>

      <BarChartVertical chartData={chartData} chartTitle={"Chiffre d'affaires mensuel"} />
      <DoughnutChart />

      <style jsx>{`
        .turnover {
          margin: 2.5rem 0 1rem 0;
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
  //cherchee le CA annuel
  const getTurnover = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `get-turnover/:${query.fiscal_year}`);
  const turnover = await getTurnover.json();

  //chercher le CA mensuel
  const data = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'post-monthly-turnover', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
    },
    body: JSON.stringify({fiscal_year: query.fiscal_year}),
  });

  const chartData = await data.json();

  return {
    props: { chartData, turnover },
  };
}
