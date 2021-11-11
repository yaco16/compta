import { getProviders, signIn, signOut, getSession, getCsrfToken } from 'next-auth/react';

export default function SignIn({ providers, csrfToken }) {
  return (
    <div>
      <h1>Se connecter</h1>
      <div>
        <form method='post ' action='/api/auth/signin/email'>
          <input type='hidden' name='csrfToken' defaultValue={csrfToken} id='' />
          <label htmlFor='email'>
            email
            <input type='text' name='email' id='email' />
          </label>
          <button type='submit'>Envoyer</button>
        </form>
      </div>
      <div>
        {Object.values(providers).map((provider, key) => {
          if (provider.name === 'Email') {
            return;
          } else {
            return (
              <div key={key}>
                {provider.name}
                <button onClick={(e) => signIn(provider.id)}>Se connecter avec {provider.name}</button>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

SignIn.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    //si le user est déjà connecté, redirection vers le dashboard
    res.writeHead(302, {
      Location: '/dashboard',
    });
    res.end();
    return;
  }
  else {
signOut()
  }
  return {
    session: undefined,
    providers: await getProviders(context),
    csrfToken: await getCsrfToken(context), //si signin avec adresse mail
  };
};
