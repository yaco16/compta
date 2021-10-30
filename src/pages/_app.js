import '../styles/reset.css';
import '../styles/globals.css';
import Layout from '../components/layout/Layout';
import ThemeContextProvider from '../context/themeContext';
import UploadContextProvider, { UploadContext } from '../context/uploadContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <UploadContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UploadContextProvider>
    </ThemeContextProvider>
  );
}

export default MyApp;
