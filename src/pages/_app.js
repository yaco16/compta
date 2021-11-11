import '../styles/reset.css';
import '../styles/globals.css';
import '../styles/proSideBar.scss';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/layout/Layout';
import ThemeContextProvider from '../context/themeContext';
import UploadContextProvider from '../context/uploadContext';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';

const Toast = function () {
  return (
    <ToastContainer
      position='top-right'
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      draggable={false}
      pauseOnVisibilityChange={false}
      pauseOnFocusLoss={false}
      closeOnClick
      pauseOnHover
    />
  );
};

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ThemeContextProvider>
        <UploadContextProvider>
          <Layout>
            <Component {...pageProps} />
            <Toast />
          </Layout>
        </UploadContextProvider>
      </ThemeContextProvider>
    </SessionProvider>
  );
}