import React, { useState, useEffect, useContext } from 'react'
import { ILogin } from '../interface';
import { LoadingContext } from 'context/loading/loadingContext';

export const LoginForm = (initialState: ILogin, validate: any) => {

  // Context & reducer
  const loadingContext = useContext(LoadingContext);
  
  const { setLoading, resetLoading } = loadingContext; 

  const [values, setvalues] = useState<ILogin>(initialState);
  const [errors, setErrors] = useState<ILogin>({
    email: '',
    password: ''
  });
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      if (errors.email === '' && errors.password === '') {
        console.log("Authenticated", values.email, values.password);
        setvalues({
          email: '',
          password: ''
        });
        setTimeout(() => {
          resetLoading();
          setSubmitting(false);
        }, 2000)
      } else {
        resetLoading();
        setSubmitting(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const validationErrors = validate(values);
    setErrors({
      email: '',
      password: ''
    });
    setLoading();
    setSubmitting(true);
  }

  return {
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    values
  }
}
