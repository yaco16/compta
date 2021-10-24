import { useState } from 'react';
import RefreshPage from '../../components/RefreshPage';

export default function TestDB(props) {
  const { allAccounts } = props;
  const [fetchedAccounts, setFetchedAccounts] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch('http://localhost:3000/api/gettotal70', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
      },
      body: JSON.stringify({
        account1: event.target.account1.value,
        account2: event.target.account2.value,
      }),
    });
    const data = await response.json();
    setFetchedAccounts(data);
    setIsLoading(false);
  };

  let resultToShow;
  if (isLoading) {
    resultToShow = <div>Veuillez patienter...</div>;
  }
  if (fetchedAccounts) {
    resultToShow =
    <div>
    <div>Total : {fetchedAccounts.sum} €</div>
    <RefreshPage />
    </div>
  }

  return (
    <div>
      <h1>Extraction</h1>
      <form onSubmit={registerUser}>
        du compte
        <select name='account1' defaultValue=''>
          <option value='' disabled>
            Choisir
          </option>
          {allAccounts.map((account, i) => {
            return (
              <option key={i} value={account.number}>
                {account.number}
              </option>
            );
          })}
        </select>
        au compte
        <select name='account2' defaultValue=''>
          <option value='' disabled>
            Choisir
          </option>
          {allAccounts.map((account, i) => {
            return (
              <option key={i} value={account.number}>
                {account.number}
              </option>
            );
          })}
        </select>
        <button>Envoyer</button>
      </form>
      <br />
      {resultToShow}
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/getallaccounts');
  const allAccounts = await response.json();
  return {
    props: { allAccounts },
  };
}
