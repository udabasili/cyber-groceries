/**
 * verify the inputs fom the authentication form
 * @param {*} key 
 * @param {*} value 
 * @returns {Boolean}
 */
export function validator(key, value) {
    switch (key) {
      case 'name':
      if (value.length > 0) {
        return true;
      }
      return false;
      case 'username':
      if (value.length > 0) {
        return true;
      }
      return false;
      case "email":
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
      case "password":
      if (value.length >= 9) {
          return true;
        }
        return false;
      case "confirmPassword":
        if (!value.password)  return;
        if (value.password === value.confirm) {
          return true;
        }
        return false;
      default:
        return
    }
  }
  export function validateError(values) {
    let errors = {};
    if(!values.email){
      errors.email = 'Email cannot be empty'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!values.name) {
      errors.name = 'Name cannot be empty'
    } 
    if (!values.username) {
      errors.username = 'Username cannot be empty'
    } 

    if (!values.password) {
      errors.password = 'Password cannot be empty'
    } else if (!(values.password.length >= 9)) {
      errors.password = 'Password must be at least 9 characters';
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords must match';
    }

    return errors

  }
  