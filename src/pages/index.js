// import { useSession, signIn, signOut } from 'next-auth/react';
import Cookies from 'js-cookie'


export default function Home() {
  const handler = async () => {
    console.log('dans handler')
    const request = await fetch('http://localhost:2222/api/' + 'setcookie', {credentials: 'include',});
    // const test = Cookies.get('token')
    // console.log('test:', test);
    const response = await request.json();
  }

  return <button onClick={handler} >Home</button>

}

// export async function getServerSideProps(context) {
//   console.log('context:', context);
//   const request = await fetch('http://localhost:2222/api/' + 'setcookie', {credentials: 'include',});
//   const response = await request.json();
//   console.log('response:', response);
//   const cookies = context.req?.headers.cookie;
//   console.log('cookies:', cookies);

//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }

