import React, { useContext } from "react";
import { useStyle } from "useStyle";
import { Link } from "react-router-dom";
import { Typography, TextField, Button, CircularProgress } from "@material-ui/core";
import { LoginForm } from "./form/LoginForm";
import { validateAuth } from "./form/ValidateAuth";
import { ILogin } from "./interface";
import { LoadingContext } from "context/loading/loadingContext";

interface Props {}

type AllProps = Props;

export const Login: React.FC<AllProps> = props => {
  const classes = useStyle();
  const loadingContext = useContext(LoadingContext);
  const { loading } = loadingContext;

  const InitialState: ILogin = {
    email: "",
    password: ""
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    // isSubmitting,
    errors,
    values
  } = LoginForm(InitialState, validateAuth);

  return (
    <div className={classes.signInForm}>
      <Typography variant="h2" style={{ marginBottom: "16px" }}>
        Sign in
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.fields}
          onBlur={handleBlur}
          label="Email"
          name="email"
          onChange={handleChange}
          type="text"
          value={values.email}
          variant="outlined"
        />
        {errors.email && (
          <Typography
            className={classes.fieldError}
            variant="body2"
          >
            {errors.email}
          </Typography>
        )}
        <TextField
          className={classes.fields}
          onBlur={handleBlur}
          label="Password"
          name="password"
          onChange={handleChange}
          type="text"
          value={values.password}
          variant="outlined"
        />
        {errors.password && (
          <Typography
            className={classes.fieldError}
            variant="body2"
          >
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
            disabled={loading || !(values.email && errors.email === '' && values.password && errors.password === '')}
          >
            Sign in now
          </Button>
          {loading && <CircularProgress size={32} className={classes.buttonProgress} color="primary" />}
        </div>
      </form>
      <div className={classes.signUpInfo}>
        <Typography>
          Don't have account? <Link to="/register">Sign up</Link>
        </Typography>
      </div>
    </div>
  );
};
