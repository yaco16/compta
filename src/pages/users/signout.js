import { signOut } from 'next-auth/react';

export default function SignOut() {
  return (
    <div>
Confirmer la déconnexion
<button onClick={() => signOut()}>Oui</button>
    </div>
  );
}

// SignOut.getInitialProps = async (context) => {
//   const { req, res } = context;
//   const session = await getSession({ req });

//   if (!session) {
//     //si le user n'est pas connecté, redirection vers page signin
//     res.writeHead(401, {
//       Location: '/account/signin',
//     });
//     res.end();
//     return;
//   }
//   // return {
//   //   session: undefined,
//   //   providers: await getProviders(context),
//   //   csrfToken: await getCsrfToken(context), //si signin avec adresse mail
//   // };
// };
