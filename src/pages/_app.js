import '../styles/reset.css';
import '../styles/globals.css';
import '../styles/proSideBar.scss';
import Layout from '../components/layout/Layout';
import ThemeContextProvider from '../context/themeContext';
import UploadContextProvider from '../context/uploadContext';
import { SessionProvider } from 'next-auth/react';
import { Toast } from '../components/Toast';
import { useRouter } from 'next/router'
import NProgress from 'nprogress'



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