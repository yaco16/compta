
export default function SignOut() {
  async function handlerSignOut(e) {
    e.preventDefault();
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'users/signout',
    {method: 'GET',
    credentials: 'include'} );}
  return (
    <div>
Are you sure to disconnect ?
<button onClick={(e) => handlerSignOut(e)}>Yes</button>
    </div>
  );
}

