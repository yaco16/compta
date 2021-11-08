import Contenu from '../components/Contenu';

import { useState } from 'react';
import Spinner from '../components/Spinner';

export default function Home() {
  return <div>Homepage</div>;
}

// export async function getServerSideProps() {
//   console.log('dans getserver')
//   const data = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/getAllAccounts'); //serverless
//   const test = await data.json();
//   return {
//     props: { test: test.message },
//   };
// }
