import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import BarChart from '../../../components/GenerateChart';

export default function TurnOver({ chartData }) {
  const router = useRouter();
  console.log(typeof router.query.pid)
  const year1 = router.query.pid.substring(2, 4)
  const year2 = router.query.pid.substring(7, 9)
  console.log('year:', year);
  const [pid, setPid] = useState(year)

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
    body: JSON.stringify({year1, year2: year2}),
  });
  const chartData = await data.json();
  return {
    props: { chartData },
  };
}
