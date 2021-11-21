import { createUser } from './queries';
import toast from './toast';


export default class CheckRegisterForm {
  static notify = (type, message) => {
    toast({ type, message });
  };

  static checkForm = async (event) => {
    const checkEmptyFields = this.checkIfFieldsAreFilled(event);
    if (checkEmptyFields.length === 0)  {
      const checkedFields = this.checkContentFields(event);
      checkedFields && this.createUser(checkedFields);
    }
  };

  static checkIfFieldsAreFilled = (event) => {
    let errors = [];
    !event.target.firstname.value && errors.push({ type: 'error', message: 'Please enter your first name' });
    !event.target.lastname.value && errors.push({ type: 'error', message: 'Please enter your last name' });
    !event.target.email.value && errors.push({ type: 'error', message: 'Please enter your email' });
    !event.target.password.value && errors.push({ type: 'error', message: 'Please enter your password' });
    !event.target.confirmPassword.value && errors.push({ type: 'error', message: 'Please enter your password verification' });
    //verifier que les 2 passwords sont les mêmes
    event.target.password.value !== event.target.confirmPassword.value && errors.push({ type: 'error', message: 'Your password does not match' });

    errors.forEach((item) => this.notify(item.type, item.message));
    return errors;
  };

  static checkContentFields = (event) => {
    const firstname = event.target.firstname.value;
    const lastname = event.target.lastname.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const isFirstnameValid = this.checkName(firstname);
    const isLastnameValid = this.checkName(lastname);

    if (isFirstnameValid && isLastnameValid) {
      const formData = {
        firstname: firstname.toLowerCase(),
        lastname: lastname.toLowerCase(),
        email: email.toLowerCase(),
        password
      };
      return formData;
    }
  };

  static checkName = (name) => {
    if (typeof name !== 'string' || !/^[^0-9_!¡?÷?¿\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/g.test(name)) {
      this.notify('error', `${name}: please enter a valid value` );
      return false;
    }
    return true;
  };

  static createUser = async (formData) => {
    const request = await createUser(formData);
    const response = await request.json();
    let type;
    let message;

    switch (response.result) {
      case 'error':
        type = 'error';
        message = response.message;
        break;
        case 'success':
        const { firstname, lastname } = response.newUser[0];
        type = 'success';
        message = `Success : new user ${this.capitalizeFirstLetter(firstname)} ${this.capitalizeFirstLetter(lastname)} created`;
        break;
      default:
        break;
    }
    this.notify(type, message);
  };

  static capitalizeFirstLetter = (name) => {
    return (name+'').charAt(0).toUpperCase()+name.substr(1);
  }
}
