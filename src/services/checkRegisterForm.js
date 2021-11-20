import { createUser } from './queries';
import toast from './toast';

export default class CheckRegisterForm {
  static checkFields = (event) => {
    const emptyFields = this.checkIfFieldsAreFilled(event);
    if (emptyFields.length !== 0) {
      return emptyFields;
    }
    // this.checkContentFields(event);
    this.createUser(event);
  };

  static checkIfFieldsAreFilled = (event) => {
    let errors = [];
    !event.target.firstname.value && errors.push({ type: 'error', message: 'Please enter your first name' });
    !event.target.lastname.value && errors.push({ type: 'error', message: 'Please enter your last name' });
    !event.target.email.value && errors.push({ type: 'error', message: 'Please enter your email' });
    !event.target.password.value && errors.push({ type: 'error', message: 'Please enter your password' });
    !event.target.confirmPassword.value && errors.push({ type: 'error', message: 'Please enter your password verification' });
    return errors;
  };

  static checkContentFields = (event) => {
    console.log('tous les champs sont remplis');
  };

  static hashPassword = (event) => {
    //code
  };

  static createUser = async (event) => {
    const formData = {
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const request = await createUser(formData);
    const response = await request.json();

    const {firstname, lastname} = response.newUser[0];

    let type;
    let message;

    switch (response.message) {
      case 'error':
        type = 'error';
        message = 'error while creating your account : try again';
        break;
      case 'success':
        type = 'success';
        message = `New user ${firstname} ${lastname} created successfully`;
        break;
      default:
        break;
    }
    this.notify(type, message);
  };

  static notify = (type, message) => {
    toast({ type: type, message: message });
  }
}
