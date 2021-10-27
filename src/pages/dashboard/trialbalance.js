import React from 'react';
import CSVReader1 from '../../components/CsvParser';

export default function TrialBalance({data}) {
  return(
    <div>
    <h1>Balance générale</h1>
    <CSVReader1 />
  </div>
  )
}

// export async function getServerSideProps() {
//   const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/turnover'); //serverless
//   const chartData = await data.json();
//   return {
//     props: { chartData },
//   };
// }