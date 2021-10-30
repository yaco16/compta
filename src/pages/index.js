import Contenu from '../components/Contenu';

export default function Home() {
  return (
    <div>
      <h1>Homepage :</h1>
      <Contenu />
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
