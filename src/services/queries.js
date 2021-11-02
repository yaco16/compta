//Dans ce fichier, on va regrouper toutes les requêtes faites à la base de données

//import de la BG en DB
export async function importTrialBalance(upload) {
  const request = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/upload-tb', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
    },
    body: JSON.stringify(upload.csv),
  });
  return request;
};

//import de la BG en DB
export async function importSalesJournal(upload) {
  const request = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/upload-sales-journal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
    },
    body: JSON.stringify(upload.csv),
  });
  return request;
};

//Liste des comptes
export default async function getAllAccounts() {
  const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/get-all-accounts');
  const allAccounts = await response.json();
  return allAccounts;
}

