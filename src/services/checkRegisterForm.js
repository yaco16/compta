export default class CheckRegisterForm {

  static checkFields = (event) => {
    const emptyFields = this.checkIfFieldsAreFilled(event);
    if (emptyFields.length !== 0) {
      return emptyFields;
    }
    this.checkContentFields(event);
  }

  static checkIfFieldsAreFilled = (event) => {
    let errors = [];
    !event.target.firstname.value && errors.push({type: 'error', message: 'Please enter your first name'});
    !event.target.lastname.value && errors.push({type: 'error', message: 'Please enter your last name'});
    !event.target.email.value && errors.push({type: 'error', message: 'Please enter your email'});
    !event.target.password.value && errors.push({type: 'error', message: 'Please enter your password'});
    !event.target.confirmPassword.value && errors.push({type: 'error', message: 'Please enter your password verification'});
    return errors;
  };

  static checkContentFields = (event) => {
    console.log('tous les champs sont remplis')
  }
}
