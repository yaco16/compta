
export default function test() {
  async function handler(e) {
    e.preventDefault();
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'users/logout',     {method: 'GET',
    credentials: 'include'} );}
  return (
    <button onClick={e=> handler(e)}>Déconnexion</button>
  )
}