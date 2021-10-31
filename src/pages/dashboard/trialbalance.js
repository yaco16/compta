import React from 'react';
import Table from '../../components/GenerateGrid2';

export default function TrialBalance({result}) {
  return(
    <div>
    <h1>Balance générale</h1>
    <Table value={result}/>
  </div>
  )
}

export async function getServerSideProps() {
  const data = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/get-all-accounts');
  const result = await data.json();
  return {
    props: { result }
  };
}