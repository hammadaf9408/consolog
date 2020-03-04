import { REGEX } from "utils/Constant";
import { IRegisterPayload } from "../interface";

export const validateRegister = (values: IRegisterPayload, blurField: string, err?: IRegisterPayload) => {
  const errors: IRegisterPayload = {
    name: (err && err.name) || "",
    email: (err && err.email) || "",
    password: (err && err.password) || "",
    confirmPassword: (err && err.confirmPassword) || "",
  };


  if (!values[blurField]) {
    if (blurField === 'confirmPassword') {
      errors.confirmPassword = 'confirmation password is required'
    } else {
      errors[blurField] = `${blurField} is required`
    }
  }

  if (blurField === 'name' && values.name) {
    errors.name = ''
  }

  if (blurField === 'email' && values.email) {
    if (!REGEX.EMAIL.test(values.email)) {
      errors.email = "Invalid email address";
    } else {
      errors.email = ""
    }
  }
  
  if (blurField === 'password' && values.password) {
    if (values.password.length < 6) {
      errors.password = "Password must be atleast 6";
    } else {
      errors.password = ""
    }
  }

  if (blurField === 'confirmPassword' && values.confirmPassword) {
    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Password doesn't match";
    } else {
      errors.confirmPassword = ""
    }
  }

  return errors;
};
