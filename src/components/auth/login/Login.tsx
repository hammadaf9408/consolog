import React, { useContext, useEffect } from "react";
import { useStyle } from "useStyle";
import { Link, RouteComponentProps } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  CircularProgress
} from "@material-ui/core";
import { LoginForm } from "./form/LoginForm";
import { validateLogin } from "./form/ValidateLogin";
import { ILoginPayload } from "./interface";
import { LoadingContext } from "context/loading/loadingContext";
import { ErrorContext } from "context/error/errorContext";
import { Cookies } from "middleware";
import { LOCALNAME } from "utils/Constant";

interface Props {}

export type LoginProps = RouteComponentProps & Props;

export const Login: React.FC<LoginProps> = props => {
  useEffect(() => {
    if (Cookies.get(LOCALNAME.TOKEN)) {
      props.history.push("/");
    }
    // eslint-disable-next-line
  }, [props.history]);

  const classes = useStyle();
  const loadingContext = useContext(LoadingContext);
  const errorContext = useContext(ErrorContext);

  const { loading } = loadingContext;
  const { error } = errorContext;

  const InitialState: ILoginPayload = {
    email: "",
    password: ""
  };

  const { handleChange, handleBlur, handleSubmit, errors, values } = LoginForm(
    InitialState,
    validateLogin,
    props
  );

  return (
    <div className={classes.signInForm}>
      <Typography variant="h2" style={{ marginBottom: "16px" }}>
        Sign in
      </Typography>
      <form onSubmit={handleSubmit}>
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
        <div className={classes.buttonWrapper}>
          <Button
            className={classes.signInButton}
            color="primary"
            size="large"
            variant="contained"
            type="submit"
            disabled={
              loading ||
              !(
                values.email &&
                errors.email === "" &&
                values.password &&
                errors.password === ""
              )
            }
          >
            Sign in now
          </Button>
          {loading && (
            <CircularProgress
              size={32}
              className={classes.buttonProgress}
              color="primary"
            />
          )}
        </div>
        {error?.status !== 0 && (
          <Typography className={classes.fieldError} variant="body2">
            {error?.status} - {error?.statusText} : {error?.message}
          </Typography>
        )}
      </form>
      <div className={classes.signUpInfo}>
        <Typography>
          Don't have account? <Link to="/register">Sign up</Link>
        </Typography>
      </div>
    </div>
  );
};
