import React, { useState } from "react";
import { useStyle } from "useStyle";
import { Link } from "react-router-dom";
import { Typography, TextField, Button } from "@material-ui/core";

interface Props {
}

type AllProps = Props;

export const Login: React.SFC<AllProps> = props => {
  const classes = useStyle();

  const [name] = useState<String>('Yomamen');

  return (
    <div className={classes.signInForm}>
      <Typography variant="h2" style={{ marginBottom: "16px" }}>
        Sign in
      </Typography>
      <form>
        <TextField
          className={classes.fields}
          label="Email"
          name="email"
          onChange={() => {}}
          type="text"
          // value="..."
          variant="outlined"
        />
        <Typography className={classes.fieldError} variant="body2">
          Error email
        </Typography>
        {/* {showEmailError && (
          <Typography
            className={classes.fieldError}
            variant="body2"
          >
            {errors.email[0]}
          </Typography>
        )} */}
        <TextField
          className={classes.fields}
          label="Password"
          name="password"
          onChange={() => {}}
          type="text"
          // value="..."
          variant="outlined"
        />
        <Button
          className={classes.signInButton}
          color="primary"
          size="large"
          variant="contained"
        >
          Sign in now {name}
        </Button>
      </form>
      <div className={classes.signUpInfo}>
        <Typography>
          Don't have account? <Link to="/register">Sign up</Link>
        </Typography>
      </div>
    </div>
  );
};