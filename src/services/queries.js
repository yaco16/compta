//Dans ce fichier, on va regrouper toutes les requêtes faites à la base de données

//import BG, journal en DB
//route dynamique en fonction du type de fichier
export async function importInDb(upload) {
  const routeSuffix = upload.fileType;
  const request = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'upload-'+ routeSuffix, {
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

