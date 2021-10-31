import { toast } from 'react-toastify';

const ToastMessage = ({ type, message }) => toast[type](message, { theme: 'colored' });

ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;
