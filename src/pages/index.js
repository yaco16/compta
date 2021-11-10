import Chart_stackedBars from '../components/charts/StackedBars';

export default function Home({StackedTurnover}) {
  return (
    <div>
hello    </div>
  );
}

export async function getServerSideProps() {
  const getStackedTurnover = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'stacked-turnover', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fiscal_year: '2019-2020' }),
  });
  const StackedTurnover = await getStackedTurnover.json();
  console.log('StackedTurnover:', StackedTurnover);
  return {
    props: { StackedTurnover },
  };
}
