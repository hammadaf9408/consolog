import React, { useState, useContext } from 'react'
import { ILoginPayload } from '../interface';
import { ApiCall, Cookies } from 'middleware';
import { API_ROUTES, LOCALNAME } from 'utils/Constant';
import { LoadingContext } from 'context/loading/loadingContext';
import { ErrorContext } from 'context/error/errorContext';
import { IError } from 'context/error/IError';
import { AxiosResponse } from 'axios';
import { IAuth } from 'components/auth/interface';

export const LoginForm = (initialState: ILoginPayload, validate: any) => {

  // Context & reducer
  const loadingContext = useContext(LoadingContext);
  const errorContext = useContext(ErrorContext);
  
  const { setLoading, resetLoading } = loadingContext;
  const { setError } = errorContext; 

  const [values, setvalues] = useState<ILoginPayload>(initialState);
  const [errors, setValidation] = useState<ILoginPayload>({
    email: '',
    password: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setvalues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const handleBlur = (event: any) => {
    const validationErrors = validate(values, event.target.name, errors);
    setValidation(validationErrors);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidation({
      email: '',
      password: ''
    });
    setLoading();
    let res: AxiosResponse<IAuth> = await ApiCall.post(API_ROUTES.LOGIN, values); 
    if (res.status === 200 && res.data.success && res.data.token) {
      console.log('res', res);
      Cookies.set(LOCALNAME.TOKEN, res.data.token, 7);
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

  return {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    values
  }
}
