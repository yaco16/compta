import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const ToastMessage = ({ type, message }) => toast[type](message, { theme: 'colored' });

ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;

export const Toast = function () {
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