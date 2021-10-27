export default function Home({test}) {
  console.log('test:', test);
  return <h1>Homepage : {test}</h1>;
}

// export async function getServerSideProps() {
//   console.log('dans getserver')
//   const data = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/getAllAccounts'); //serverless
//   const test = await data.json();
//   return {
//     props: { test: test.message },
//   };
// }