import BarChart from '../../../components/GenerateChart';

export default function TurnOver({ chartData }) {
  return (
    <div>
      <h1>Stats chiffre d&#39;affaires</h1>
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
      year1: query.pid.substring(2, 4),
      year2: query.pid.substring(7, 9),
    }),
  });
  const chartData = await data.json();
  return {
    props: { chartData },
  };
}
