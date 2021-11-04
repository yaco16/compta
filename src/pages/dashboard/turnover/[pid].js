import BarChart from '../../../components/GenerateChart';

export default function TurnOver({ chartData }) {
  console.log(process.env.BASE_URL_NEXT_API);
  return (
    <div>
      <h1>Stats chiffre d&#39;affaires</h1>
        <BarChart chartData={chartData} />
    </div>
  );
}

export async function getServerSideProps() {
  const data = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'post-monthly-turnover', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
    },
    body: JSON.stringify({year1: 21, year2: 22}),
  });
  const chartData = await data.json();
  return {
    props: { chartData },
  };
}
