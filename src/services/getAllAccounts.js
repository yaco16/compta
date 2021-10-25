export default async function getAllAccounts() {
  const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/getAllAccounts');
  const allAccounts = await response.json();
  return allAccounts;
}
