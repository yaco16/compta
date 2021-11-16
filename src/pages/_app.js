import '../styles/reset.css';
import '../styles/globals.css';
import '../styles/proSideBar.scss';
import '../styles/nprogress.css';
import Layout from '../components/layout/Layout';
import ThemeContextProvider from '../context/themeContext';
import UploadContextProvider from '../context/uploadContext';
import { SessionProvider } from 'next-auth/react';
import { Toast } from '../components/Toast';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import NProgress from 'nprogress'



export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url) => {
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

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