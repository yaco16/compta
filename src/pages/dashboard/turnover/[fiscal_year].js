import { useRouter } from 'next/router';
import BarChart from '../../../components/GenerateChart';

export default function TurnOver({ chartData }) {
  const {query} = useRouter();
  const fiscalYear = query.fiscal_year;

  return (
    <div>
      <h1>Chiffre d&#39;affaires</h1>
      <h2>Exercice {fiscalYear}</h2>
      <BarChart chartData={chartData} />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const data = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'post-monthly-turnover', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
    },
    body: JSON.stringify({
      year1: query.fiscal_year.substring(2, 4),
      year2: query.fiscal_year.substring(7, 9),
    }),
  });
  const chartData = await data.json();
  return {
    props: { chartData },
  };
}
