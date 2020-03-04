import { Cookies } from "middleware";

const API_ENDPOINT = process.env.REACT_APP_API_URL || '';

const API_ROUTES = {
  // Auth
  LOGIN: API_ENDPOINT + '/api/v1/auth/login',
  REGISTER: API_ENDPOINT + '/api/v1/auth/register',
  FORGOT_PASSWORD: API_ENDPOINT + '/api/v1/auth/forgotpassword',
  RESET_PASSWORD: API_ENDPOINT + '/api/v1/auth/resetpassword/',
  UPDATE_PASSWORD: API_ENDPOINT + '/api/v1/auth/updatepassword',

  // User
  GET_ME: API_ENDPOINT + '/api/v1/user/me',
  UPDATE_USER: API_ENDPOINT + '/api/v1/user/updatedetails',

  // Note
  NOTES: API_ENDPOINT + '/api/v1/note',
  // SINGLE_NOTE: API_ENDPOINT + '/api/v1/note',
  // CREATE_NOTE: API_ENDPOINT + '/api/v1/note',
  // UPDATE_NOTE: API_ENDPOINT + '/api/v1/note',
  // DELETE_NOTE: API_ENDPOINT + '/api/v1/note',
}

const REGEX = {
  // EMAIL : /^\S+@\S+\.\S+$/
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
  SIXCHAR: /.{6,20}/,
  NUMBER: /\d/,
  LOWERCASE: /[a-z]/,
  UPPERCASE: /[A-Z]/
}

const LOCALNAME = {
  TOKEN : 'TOKEN',
  APICONST : 'APICONST'
}

const CONFIG_AXIOS = {
  NOAUTH: {
    headers: {
      'Content-Type': 'application/json',
    }
  },
  WITHAUTH: {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookies.get(LOCALNAME.TOKEN)}`
    }
  }
}
export {
  API_ENDPOINT,
  API_ROUTES,
  REGEX,
  LOCALNAME,
  CONFIG_AXIOS
}