/* eslint-disable react/no-unescaped-entities */
import { getProviders, signIn, getSession, getCsrfToken } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import toast from '../../services/toast';
import { useCallback } from 'react';
import CheckRegisterForm from '../../services/checkRegisterForm';

export default function SignIn({ providers, csrfToken }) {
  //TOAST MESSAGES
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const checkFields = (event) => {
    event.preventDefault();

    //Vérifier si les champs sont vides
    const emptyFields = CheckRegisterForm.checkFields(event);
    // emptyFields && emptyFields.forEach((item) => notify(item.type, item.message));
  };

  return (
    <div>
      <h1 className='trademark'>Accountancy</h1>
      <div className='form-container'>
        <div className='title'>Create your account</div>
        <form
          onSubmit={(event) => {
            checkFields(event);
          }}
        >
          <div className='field-container'>
            <input type='hidden' name='csrfToken' defaultValue={csrfToken} className='field' />
            <input type='text' name='firstname' placeholder='Firstname' className='field' />
            <input type='text' name='lastname' placeholder='Lastname' className='field' />
            <input type='email' name='email' placeholder='E-mail' className='field' />
            <input type='password' name='password' placeholder='Password' className='field' />
            <input type='password' name='confirmPassword' id='confirmPassword' placeholder='Password verification' className='field' />

            <button type='submit' className='submit'>
              Sign up
            </button>
          </div>
          <div className='third-party-info'>or use a third-party service</div>
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
                  <div className='provider-name'>Sign up with {provider.name}</div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className='login-container'>
        <div className='login-text'>
          <Link href='/account/login'>
            <a>
              Already have an account? <span className='login-span'>Login</span>
            </a>
          </Link>
        </div>
      </div>

      <style jsx>
        {`
          .form-container,
          .login-container {
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
            outline: solid #c2dbfe 4px;
            border: solid #3b6b96 1px;
            border-radius: 6px;
            color: black;
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

          .login-container {
            margin-top: 2rem;
            padding: 1rem 0;
            text-align: center;
          }

          .login-text {
            color: #898f9a;
          }

          .login-span {
            color: black;
          }

          .login-text:hover .login-span {
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
