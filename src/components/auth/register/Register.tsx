import React, { useContext, useEffect } from "react";
import {
  Typography,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText
} from "@material-ui/core";
import { Link, RouteComponentProps } from "react-router-dom";
import { useStyle } from "useStyle";
import { LoadingContext } from "context/loading/loadingContext";
import { IRegisterPayload } from "./interface";
import { ErrorContext } from "context/error/errorContext";
import { Cookies, ApiCall } from "middleware";
import { LOCALNAME, API_ROUTES, REGEX } from "utils/Constant";
import { useForm } from "react-hook-form";
import { AxiosResponse } from "axios";
import { IAuth } from "../interface";
import { IError } from "context/error/IError";
import { AuthContainer } from "../AuthContainer";

interface Props {}

export type RegisterProps = RouteComponentProps & Props;

export const Register: React.FC<RegisterProps> = props => {
  useEffect(() => {
    if (Cookies.get(LOCALNAME.TOKEN)) {
      props.history.push("/");
    }
    // eslint-disable-next-line
  }, [props.history]);

  const { history } = props;
  const classes = useStyle();
  const loadingContext = useContext(LoadingContext);
  const errorContext = useContext(ErrorContext);

  const { loading, setLoading, resetLoading } = loadingContext;
  const { error, setError } = errorContext;

  const { handleSubmit, register, errors, watch } = useForm<IRegisterPayload>({
    mode: "onChange",
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  // useEffect(() => {
  //   console.log('err', errors);
  // })

  const onSubmit = async (values: IRegisterPayload) => {
    setLoading();
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password
    };

    let res: AxiosResponse<IAuth> = await ApiCall.post(API_ROUTES.REGISTER, payload);
    if (res.status === 200 && res.data.success && res.data.token) {
      // console.log('register', res);
      Cookies.set(LOCALNAME.TOKEN, res.data.token, 7);
      history.push('/');
    } else {
      const err: IError = {
        status: res.status,
        statusText: res.statusText,
        message: res.data.error || 'Error'
      }
      setError(err);
    }
    resetLoading();
  };

  return (
    <AuthContainer>
      <div className={classes.signInForm}>
        <Typography variant="h2" style={{ marginBottom: "16px" }}>
          Sign up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl variant="outlined" error={!!(errors.name)} className={classes.fields}>
            <InputLabel>Name</InputLabel>
            <OutlinedInput
              disabled={loading}
              type="text"
              label="Name"
              name="name"
              inputRef={register({required: true})}
              error={!!(errors.name)}
            />
            {errors.name && (
              <FormHelperText>{errors.name.type === 'required' ? 'Name is required' : errors.name.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl variant="outlined" error={!!(errors.email)} className={classes.fields}>
            <InputLabel>Email</InputLabel>
            <OutlinedInput
              disabled={loading}
              type="text"
              label="Email"
              name="email"
              inputRef={register({
                required: true,
                pattern: {
                  value: REGEX.EMAIL,
                  message: "Invalid email address"
                }
              })}
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
              inputRef={register({
                required: true,
                minLength: {
                  value: 6,
                  message: 'Password must be atleast 6'
                }
              })}
              error={!!(errors.password)}
            />
            {errors.password && (
              <FormHelperText>{errors.password.type === 'required' ? 'Password is required' : errors.password.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl variant="outlined" error={!!(errors.confirmPassword)} className={classes.fields}>
            <InputLabel>Confirmation Password</InputLabel>
            <OutlinedInput
              disabled={loading}
              type="password"
              label="Confirmation Password"
              name="confirmPassword"
              inputRef={register({
                required: true,
                validate: value => value === watch("password") || "Password doesn't match"
              })}
              error={!!(errors.confirmPassword)}
            />
            {errors.confirmPassword && (
              <FormHelperText>{errors.confirmPassword.type === 'required' ? 'Confirmation Password is required' : errors.confirmPassword.message}</FormHelperText>
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
          {error?.status !== 0 && (
            <Typography className={classes.fieldError} variant="body2">
              {error?.status} - {error?.statusText} : {error?.message}
            </Typography>
          )}
        </form>
        <div className={classes.signUpInfo}>
          <Typography>
            Have account ? <Link to="/login">Login</Link>
          </Typography>
        </div>
      </div>
    </AuthContainer>
  );
};
