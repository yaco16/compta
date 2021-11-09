export default function VatCalculation(props) {
  return <div>VAT</div>;
}

export async function getServerSideProps() {
  const data = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/vat'); //serverless
  const test = await data.json();
  return {
    props: { test: test.message },
  };
}