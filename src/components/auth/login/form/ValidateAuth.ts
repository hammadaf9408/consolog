import { REGEX } from "utils/Constant";
import { ILogin } from "../interface";

export const validateAuth = (values: ILogin, blurField: string, err?: ILogin) => {
  const errors: ILogin = {
    email: (err && err.email) || "",
    password: (err && err.password) || ""
  };


  if (!values[blurField]) {
    errors[blurField] = `Required ${blurField}`
  }

  if (blurField === 'email' && values.email) {
    if (!REGEX.EMAIL.test(values.email)) {
      errors.email = "Invalid email address";
    } else {
      errors.email = ""
    }
  } else if (blurField === 'password' && values.password) {
    if (values.password.length < 6) {
      errors.password = "Password must be atleast 6";
    } else {
      errors.password = ""
    }
  }

  return errors;
};
