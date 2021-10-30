import '../styles/reset.css';
import '../styles/globals.css';
import Layout from '../components/layout/Layout';
import { ThemeContext } from '../context/themeContext';
import { useState } from 'react';
import BtnToggle from '../components/BtnToggle';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(true);
  const toggleTheme = () => {
    setTheme(!theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Layout>
        <BtnToggle />
        <Component {...pageProps} />
      </Layout>
    </ThemeContext.Provider>
  );
}

export default MyApp;
