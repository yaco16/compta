import '../styles/reset.css';
import '../styles/globals.css';
import "react-toastify/dist/ReactToastify.css";
import Layout from '../components/layout/Layout';
import ThemeContextProvider from '../context/themeContext';
import UploadContextProvider from '../context/uploadContext';
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
        <Layout>
          <Component {...pageProps} />
          <Toast />
        </Layout>
      </UploadContextProvider>
    </ThemeContextProvider>
  );
}

export default MyApp;
