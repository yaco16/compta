import Chart_stackedBars from '../components/charts/StackedBars';

export default function Home() {
  return (
    <div>
      <Chart_stackedBars chartTitle={'CA mensuel avec surcoms et cut-off'} />
    </div>
  );
}

// export async function getServerSideProps() {
//   console.log('dans getserver')
//   const data = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/getAllAccounts'); //serverless
//   const test = await data.json();
//   return {
//     props: { test: test.message },
//   };
// }
