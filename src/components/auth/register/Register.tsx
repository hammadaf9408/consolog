import React, { useContext, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  CircularProgress
} from "@material-ui/core";
import { Link, RouteComponentProps } from "react-router-dom";
import { Registerform } from "./form/RegisterForm";
import { validateRegister } from "./form/ValidateRegister";
import { useStyle } from "useStyle";
import { LoadingContext } from "context/loading/loadingContext";
import { IRegister } from "./interface";
import { ErrorContext } from "context/error/errorContext";
import { Cookies } from "middleware";
import { LOCALNAME } from "utils/Constant";

interface Props {}

export type RegisterProps = RouteComponentProps & Props;

export const Register: React.FC<RegisterProps> = props => {

  useEffect(() => {
    if (Cookies.get(LOCALNAME.TOKEN)) {
      props.history.push('/')
    }
    // eslint-disable-next-line
  }, [props.history])
  
  const classes = useStyle();
  const loadingContext = useContext(LoadingContext);
  const errorContext = useContext(ErrorContext);

  const { loading } = loadingContext;
  const { error } = errorContext;

  const InitialState: IRegister = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    values
  } = Registerform(InitialState, validateRegister, props);

  const isValid = (): Boolean => {
    if (
      values.name && errors.name === '' &&
      values.email && errors.email === '' &&
      values.password && errors.password === '' &&
      values.confirmPassword && errors.confirmPassword === ''
    ) {
      return true;
    }

    return false;
  }

  return (
    <div className={classes.signInForm}>
      <Typography variant="h2" style={{ marginBottom: "16px" }}>
        Sign up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.fields}
          disabled={loading}
          onBlur={handleBlur}
          label="Name"
          name="name"
          onChange={handleChange}
          type="text"
          value={values.name}
          variant="outlined"
        />
        {errors.name && (
          <Typography className={classes.fieldError} variant="body2">
            {errors.name}
          </Typography>
        )}
        <TextField
          className={classes.fields}
          disabled={loading}
          onBlur={handleBlur}
          label="Email"
          name="email"
          onChange={handleChange}
          type="text"
          value={values.email}
          variant="outlined"
        />
        {errors.email && (
          <Typography className={classes.fieldError} variant="body2">
            {errors.email}
          </Typography>
        )}
        <TextField
          className={classes.fields}
          disabled={loading}
          onBlur={handleBlur}
          label="Password"
          name="password"
          onChange={handleChange}
          type="password"
          value={values.password}
          variant="outlined"
        />
        {errors.password && (
          <Typography className={classes.fieldError} variant="body2">
            {errors.password}
          </Typography>
        )}
        <TextField
          className={classes.fields}
          disabled={loading}
          onBlur={handleBlur}
          label="Confirmation Password"
          name="confirmPassword"
          onChange={handleChange}
          type="password"
          value={values.confirmPassword}
          variant="outlined"
        />
        {errors.confirmPassword && (
          <Typography className={classes.fieldError} variant="body2">
            {errors.confirmPassword}
          </Typography>
        )}
        <div className={classes.buttonWrapper}>
          <Button
            className={classes.signInButton}
            color="primary"
            size="large"
            variant="contained"
            type="submit"
            disabled={
              loading ||
              !isValid()
            }
          >
            Sign up
          </Button>
          {loading && (
            <CircularProgress
              size={32}
              className={classes.buttonProgress}
              color="primary"
            />
          )}
        </div>
        {error.status !== 0 && (
          <Typography
            className={classes.fieldError}
            variant="body2"
          >
            {error.status} - {error.statusText} : {error.message}
          </Typography>
        )}
      </form>
      <div className={classes.signUpInfo}>
        <Typography>
          Have account ? <Link to="/login">Login</Link>
        </Typography>
      </div>
    </div>
  );
};
