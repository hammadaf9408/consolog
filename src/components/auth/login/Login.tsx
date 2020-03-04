import React, { useContext, useEffect } from "react";
import { useStyle } from "useStyle";
import { Link, RouteComponentProps } from "react-router-dom";
import {
  Typography,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@material-ui/core";
import { ILoginPayload } from "./interface";
import { LoadingContext } from "context/loading/loadingContext";
import { ErrorContext } from "context/error/errorContext";
import { Cookies, ApiCall } from "middleware";
import { LOCALNAME, API_ROUTES, CONFIG_AXIOS } from "utils/Constant";
import { useForm } from "react-hook-form";
import { AxiosResponse } from "axios";
import { IAuth } from "../interface";
import { IError } from "context/error/IError";
import { AuthContainer } from "../AuthContainer";

interface Props {}

export type LoginProps = RouteComponentProps & Props;

export const Login: React.FC<LoginProps> = props => {
  useEffect(() => {
    if (Cookies.get(LOCALNAME.TOKEN)) {
      props.history.push("/home");
    }
    // eslint-disable-next-line
  }, [props.history]);

  const { history } = props;
  const classes = useStyle();
  const loadingContext = useContext(LoadingContext);
  const errorContext = useContext(ErrorContext);

  const { loading, setLoading, resetLoading } = loadingContext;
  const { error, setError } = errorContext;

  
  const { handleSubmit, register, errors } = useForm<ILoginPayload>({
    mode: "onChange",
    defaultValues: {
      email: '',
      password: ''
    }
  });
  
  const onSubmit = async (values: ILoginPayload) => {
    setLoading();
    let res: AxiosResponse<IAuth> = await ApiCall.post(API_ROUTES.LOGIN, values, CONFIG_AXIOS.NOAUTH); 
    if (res) {
      if (res.status === 200 && res.data.success && res.data.token) {
        Cookies.set(LOCALNAME.TOKEN, res.data.token, 7);
        history.push('/home');
      } else {
        const err: IError = {
          status: res.status,
          statusText: res.statusText,
          message: res.data.error || 'Error'
        }
        setError(err);
      }
      resetLoading();
    }
  };

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