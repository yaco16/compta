import BarChart from '../../components/GenerateChart';

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
  const data = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'get-monthly-turnover');
  const chartData = await data.json();
  return {
    props: { chartData },
  };
}
