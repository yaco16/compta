import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home({ StackedTurnover }) {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
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
  return {
    props: { StackedTurnover },
  };
}
