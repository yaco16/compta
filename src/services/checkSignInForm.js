import { signIn } from './queries';
import toast from './toast';

export default class CheckSignInForm {
  static notify = (type, message) => {
    toast({ type, message });
  };

  static checkForm = async (event) => {
    const checkEmptyFields = this.checkIfFieldsAreFilled(event);
    if (checkEmptyFields.length === 0) {
      this.getUser(event);
    }
  };

  static checkIfFieldsAreFilled = (event) => {
    let errors = [];
    !event.target.email.value && errors.push({ type: 'error', message: 'Please enter your email' });
    !event.target.password.value && errors.push({ type: 'error', message: 'Please enter your password' });

    errors.forEach((item) => this.notify(item.type, item.message));
    return errors;
  };

  static getUser = async (event) => {

    const email = event.target.email.value.toLowerCase();
    const password = event.target.password.value;

    const request = await signIn({ email, password });
    const response = await request.json();
    const { result, message } = response;
    console.log('response:', response);

    this.notify(result, message);
  };
}
