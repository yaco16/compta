import '../styles/reset.css';
import '../styles/globals.css';
import Layout from '../components/layout/Layout';
import ThemeContextProvider from '../context/themeContext';
import BtnToggle from '../components/BtnToggle';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <Layout>
        <BtnToggle />
        <Component {...pageProps} />
      </Layout>
    </ThemeContextProvider>
  );
}

export default MyApp;
