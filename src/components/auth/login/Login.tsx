import React, { useContext, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import {
  Typography,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import { ILoginPayload } from "./interface";
import { LoadingContext } from "context/loading/loadingContext";
import { ErrorContext } from "context/error/errorContext";
import { Cookies } from "middleware";
import { LOCALNAME, API_ROUTES } from "utils/Constant";
import { useForm } from "react-hook-form";
import { AuthContainer } from "../AuthContainer";
import { styles } from 'styles';
import { useApi } from "components/hooks/useApi";

interface Props {}

export type LoginProps 
  = RouteComponentProps 
  & WithStyles<typeof styles>
  & Props;

const LoginView: React.FC<LoginProps> = props => {

  /* ============================================ PROPS =============================================== */

  const { history, classes } = props;
  const { postOnApi } = useApi();
  const { handleSubmit, register, errors } = useForm<ILoginPayload>({
    mode: "onChange",
    defaultValues: {
      email: '',
      password: ''
    }
  });
  
  /* ============================================ USESTATE ============================================ */
  
  
  /* ============================================ USECONTEXT ========================================== */
  
  const loadingContext = useContext(LoadingContext);
  const errorContext = useContext(ErrorContext);

  const { loading } = loadingContext;
  const { error } = errorContext;

  /* ============================================ USEEFFECT =========================================== */

  useEffect(() => {
    if (Cookies.get(LOCALNAME.TOKEN)) {
      props.history.push("/home");
    }
    // eslint-disable-next-line
  }, [props.history]);

  /* ============================================ OTHERS ============================================== */

  const onSubmit = (values: ILoginPayload) => {
    const next = (res: any) => {
      Cookies.set(LOCALNAME.TOKEN, res.data.token, 7);
      history.push('/home');
    }

    postOnApi(API_ROUTES.LOGIN, values, false, next);
  };
  
  /* ============================================ VIEW ================================================ */

  return ( 
    <AuthContainer>
      <div className={classes.signInForm}>
        <Typography variant="h2" style={{ marginBottom: "16px" }}>
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl variant="outlined" error={!!(errors.email)} className={classes.fields}>
            <InputLabel>Email</InputLabel>
            <OutlinedInput
              disabled={loading}
              type="text"
              label="Email"
              name="email"
              inputRef={register()}
              error={!!(errors.email)}
            />
            {errors.email && (
              <FormHelperText>{errors.email.type === 'required' ? 'Email is required' : errors.email.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl variant="outlined" error={!!(errors.password)} className={classes.fields}>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              disabled={loading}
              type="password"
              label="Password"
              name="password"
              inputRef={register()}
              error={!!(errors.password)}
            />
            {errors.password && (
              <FormHelperText>{errors.password.type === 'required' ? 'Password is required' : errors.password.message}</FormHelperText>
            )}
          </FormControl>
          <div className={classes.buttonWrapper}>
            <Button
              className={classes.signInButton}
              color="primary"
              size="large"
              variant="contained"
              type="submit"
              disabled={loading}
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
    </AuthContainer>
  );
};

export const Login = withStyles(styles)(LoginView)