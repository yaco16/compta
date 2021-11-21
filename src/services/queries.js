//Dans ce fichier, on va regrouper toutes les requêtes faites à la base de données

//import BG, journal en DB
export async function importInDb(upload) {
  const request = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'upload-journal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
    },
    body: JSON.stringify(upload
      ),
  });
  return request;
};

//Liste des comptes
export  async function getAllAccounts() {
  const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/get-all-accounts');
  const allAccounts = await response.json();
  return allAccounts;
}

//créer un nouvel utilisateur
export async function createUser(formData) {
  const request = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'accounts/create-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  return request;
};

//chercher un  utilisateur
export async function getUser(formData) {
  const request = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'accounts/get-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  return request;
};

