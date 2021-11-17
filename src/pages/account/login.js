/* eslint-disable react/no-unescaped-entities */
import { getProviders, signIn, signOut, getSession, getCsrfToken } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export default function SignIn({ providers, csrfToken }) {
  return (
    <div>
      <h1 className='trademark'>Accountancy</h1>
      <div className='form-container'>
        <div className='title'>Welcome back!</div>
        <form method='post ' action='/api/auth/signin/email'>
          <div className='field-container'>
            <input type='hidden' name='csrfToken' defaultValue={csrfToken} id='' />
            <input type='email' name='email' placeholder='E-mail' className='field'/>
            <input type='password' name='password' placeholder='Password' className='field' />
            <div className='forgot-password-container'>
              <label>
                <input type='checkbox' name='keepSignedIn' className='keep-signed-in' id='' />
                Keep me signed in
              </label>
              <div className='forgot-password'>
                <Link href='#'>
                  <a>Forgot your password</a>
                </Link>
              </div>
            </div>
            <button type='submit' className='submit'>
              Log in
            </button>
          </div>
      <div className="third-party-info">or use a third-party service</div>
        </form>
        <div className='providers-container'>
          {Object.values(providers).map((provider, key) => {
            if (provider.name === 'Email') {
              return;
            } else {
              return (
                <div className='provider' key={key} onClick={() => signIn(provider.id)}>
                  <Image
                    src={provider.name === 'GitHub' ? '/github.svg' : '/google.svg'}
                    alt={provider.name === 'GitHub' ? '/github.svg' : '/google.svg'}
                    width={18}
                    height={18}
                  />
                  <div className='provider-name'>Sign in with {provider.name}</div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className='signup-container'>
        <div className='signup-text'>
          <Link href='/account/register'><a>Don't have an account? <span className='signup-span'>Sign up</span></a></Link>
        </div>
      </div>

      <style jsx>
        {`
          .form-container, .signup-container {
            width: 60%;
            margin: 0 auto;
            border: solid #bfc9db 1px;
            border-radius: 5px;
          }

          .form-container {
            background-color: white;
          }

          .trademark {
            color: #bfc9db;
            margin-top: 3rem;
          }

          .title {
            color: #585967;
            text-align: center;
            font-weight: 500;
            font-size: 1.2rem;
            padding: 3rem 0;
          }

          .field-container {
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .field {
            display: block;
            width: 100%;
            height: 2rem;
            font-size: 1rem;
            color: #a09d92;
            padding: 1.3rem 1rem;
            border: solid #ced4da 1px;
            border-radius: 4px;
            margin-bottom: 0.5rem;
            transition: all 0.05s ease-in-out;
          }

          .field:focus {
            outline: solid  #C2DBFE 4px;
            border: solid #3b6b96 1px;
            border-radius: 6px;
          }

          .forgot-password-container {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            align-items: center;
            margin: 0.8rem 0;
          }

          .forgot-password {
            color: #2962ae;
          }

          .submit {
            width: 100%;
            background-color: #4ca659;
            font-size: 1.1rem;
            color: white;
            padding: 7px 14px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          .submit:hover {
            background-color: #449550;
          }

          .providers-container {
            display: flex;
            justify-content: center;
            color: #898f9a;
          }

          .provider:first-child {
            border-right: solid #bfc9db 1px;
          }

          .provider {
            border-top: solid #bfc9db 1px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            padding: 1rem;
          }

          .provider-name {
            margin-left: 0.2rem;
          }

          .provider:hover {
            color: #475967;
          }

          .third-party-info {
            text-align: center;
            margin: 2rem auto;
            color: #877070;
            font-size: 0.9rem;

          }

          .signup-container {
            margin-top: 2rem;
            padding: 1rem 0;
            text-align: center;
          }

          .signup-text {
            color: #898f9a;
          }

          .signup-span {
            color: black;
          }

          .signup-text:hover .signup-span {
            text-decoration: underline;
          }
        `}
      </style>
    </div>
  );
}

SignIn.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });
  console.log('session:', session);

  if (session && res && session.accessToken) {
    //si le user est déjà connecté, redirection vers le dashboard
    res.writeHead(302, {
      Location: '/dashboard',
    });
    res.end();
    return;
  }

  return {
    session: undefined,
    providers: await getProviders(context),
    csrfToken: await getCsrfToken(context), //si signin avec adresse mail
  };
};
