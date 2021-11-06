import MultiBarsChart from '../../../components/charts/MultiBars';

export default function Overview({ chartData }) {

  return (
    <>
      <h1>Comparatif</h1>
      <MultiBarsChart chartData={chartData} chartTitle={'tableau'} />
    </>
  );
}

export async function getServerSideProps() {
  const data2020 = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'post-monthly-turnover', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
    },
    body: JSON.stringify({
      year1: 19, //2021 => 21
      year2: 20,
    }),
  });

  const data2021 = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'post-monthly-turnover', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
    },
    body: JSON.stringify({
      year1: 20, //2021 => 21
      year2: 21,
    }),
  });

  const data2022 = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'post-monthly-turnover', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
    },
    body: JSON.stringify({
      year1: 21, //2021 => 21
      year2: 22,
    }),
  });

  const chartData = {
    fy2020: await data2020.json(),
    fy2021: await data2021.json(),
    fy2022: await data2022.json(),
  };

  return {
    props: { chartData },
  };
}
