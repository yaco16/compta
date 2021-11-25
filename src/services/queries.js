//Dans ce fichier, on va regrouper toutes les requêtes faites à la base de données

//import BG, journal en DB
export async function importInDb(upload) {
  const request = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'upload-journal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
    },
    body: JSON.stringify(upload),
  });
  return request;
}

//Liste des comptes
export async function getAllAccounts() {
  const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/get-all-accounts');
  const allAccounts = await response.json();
  return allAccounts;
}

//SIGNIN
export async function signUp(formData) {
  const request = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'users/signup', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  return request;
}

//SIGN IN
export async function signIn(formData) {
  const request = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'users/signin', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  return request;
}

//LOGOUT
export async function signOut() {
  const request = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'users/signout');
  return request;
}
