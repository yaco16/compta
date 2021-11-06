import MultiBarsChart from '../../../components/charts/MultiBars';
import ChartBarHorizontal from '../../../components/charts/BarH';

export default function Overview({ chartData }) {
  console.log('chartData props:', chartData.fy2020);
  return (
    <>
      <h1>Comparatif</h1>
      <ChartBarHorizontal chartData={chartData}/>
      <MultiBarsChart chartData={chartData} chartTitle={'tableau'} />
    </>
  );
}

export async function getServerSideProps() {
  const fiscalYears = [2020, 2021, 2022];
  const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'compare-fiscal-years', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
    },
    body: JSON.stringify({
      fiscalYears,
      category: 'turnover',
    }),
  });

    const result = await response.json();

  const chartData = {
    fy2020: await result.turnover1[0].sum,
    fy2021: await result.turnover2[0].sum,
    fy2022: await result.turnover3[0].sum,
  };

  return {
    props: { chartData },
  };
}
