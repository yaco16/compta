import BarChart from '../../components/GenerateChart';

export default function TurnOver({ chartData }) {
  console.log(process.env.BASE_URL_NEXT_API);
  return (
    <div>
      <h1>Stats chiffre d&#39;affaires</h1>
      <div id='chart_container'>
        <BarChart chartData={chartData} />
        <BarChart chartData={chartData} />
        <BarChart chartData={chartData} />
        <BarChart chartData={chartData} />
      </div>
      <style jsx>{`
        #chart_container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'get-monthly-turnover'); //serverless
  const chartData = await data.json();
  return {
    props: { chartData },
  };
}
