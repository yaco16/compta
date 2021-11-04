import '../styles/reset.css';
import '../styles/globals.css';
import '../styles/proSideBar.scss';
import "react-toastify/dist/ReactToastify.css";
import Layout from '../components/layout/Layout';
import ThemeContextProvider from '../context/themeContext';
import UploadContextProvider from '../context/uploadContext';
import FiscalYearContextProvider from '../context/fiscalYear';
import { ToastContainer } from "react-toastify";

const Toast = function() {
  return(
    <ToastContainer
    position="top-right"
    autoClose={2500}
    hideProgressBar={false}
    newestOnTop={false}
    draggable={false}
    pauseOnVisibilityChange={false}
    pauseOnFocusLoss={false}
    closeOnClick
    pauseOnHover
  />
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <UploadContextProvider>
      <FiscalYearContextProvider>
        <Layout>
          <Component {...pageProps} />
          <Toast />
        </Layout>
        </FiscalYearContextProvider>
      </UploadContextProvider>
    </ThemeContextProvider>
  );
}

export default MyApp;
