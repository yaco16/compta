import { useState } from 'react';
import Spinner from '../../../components/Spinner';
import BarChart from '../../../components/Chart_bar';


const options = {
  animation: true,
  title: {
    display: true,
    text: 'Population growth (millions): Europe & Africa',
  },
  legend: { display: false },
};

export default function Overview({chartData}) {
  console.log('chartData:', chartData.fy2020.labels.length);
  const [loading, setLoading] = useState(true)
  // chartData.fy2020.labels.length > 0 ? setLoading(false) : '';

  const data = {
    labels: chartData.fy2021.labels,
    datasets: [
      {
        label: '2019/2020',
        type: 'bar',
        backgroundColor: '#99d98c',
        data: chartData.fy2020.datasets[0].data,
      },
      {
        label: '2020/2021',
        type: 'bar',
        backgroundColor: '#76c893',
        data: chartData.fy2021.datasets[0].data,
        fill: false,
      },
      {
        label: '2021/2022',
        type: 'bar',
        backgroundColor: '#52b69a',
        data: chartData.fy2022.datasets[0].data,
        fill: false,
      },
    ],
  };

  return (
    <>
    <h1>Comparatif</h1>
    {!loading ? <BarChart chartData={data} options={options} /> : <Spinner />
       }

    </>
  );
};

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
    fy2022: await data2022.json()};

  return {
    props: { chartData },
  };
}
