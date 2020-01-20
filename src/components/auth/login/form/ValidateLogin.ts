import { REGEX } from "utils/Constant";
import { ILoginPayload } from "../interface";

export const validateLogin = (values: ILoginPayload, blurField: string, err?: ILoginPayload) => {
  const errors: ILoginPayload = {
    email: (err && err.email) || "",
    password: (err && err.password) || ""
  };


  if (!values[blurField]) {
    errors[blurField] = `${blurField} is required`
  }

  if (blurField === 'email' && values.email) {
    if (!REGEX.EMAIL.test(values.email)) {
      errors.email = "Invalid email address";
    } else {
      errors.email = ""
    }
  } else if (blurField === 'password' && values.password) {
    if (values.password.length < 2) {
      errors.password = "Password must be atleast 6";
    } else {
      errors.password = ""
    }
  }

  return errors;
};
