import React, { useState, useContext } from 'react'
import { IRegister } from '../interface';
import { LoadingContext } from 'context/loading/loadingContext';
import { ApiCall, Cookies } from 'middleware';
import { API_ROUTES, LOCALNAME } from 'utils/Constant';
import { IAuth } from 'components/auth/interface';
import { AxiosResponse } from 'axios';
import { IError } from 'context/error/IError';
import { ErrorContext } from 'context/error/errorContext';

export const Registerform = (initialState: IRegister, validate: any) => {

  // Context & reducer
  const loadingContext = useContext(LoadingContext);
  const errorContext = useContext(ErrorContext);
  
  const { setLoading, resetLoading } = loadingContext; 
  const { setError } = errorContext; 

  const [values, setvalues] = useState<IRegister>(initialState);
  const [errors, setErrors] = useState<IRegister>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setvalues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const handleBlur = (event: any) => {
    const validationErrors = validate(values, event.target.name, errors);
    setErrors(validationErrors);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setLoading();
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    let res: AxiosResponse<IAuth> = await ApiCall.post(API_ROUTES.REGISTER, payload);
    if (res.status === 200 && res.data.success && res.data.token) {
      console.log('register', res);
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
