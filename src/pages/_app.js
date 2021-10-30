import '../styles/reset.css';
import '../styles/globals.css';
import Layout from '../components/layout/Layout';
import ThemeContextProvider from '../context/themeContext';


function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeContextProvider>
  );
}

export default MyApp;
