import React, { useState, useEffect } from 'react'
import { ILogin } from '../interface';

export const LoginForm = (initialState: ILogin, validate: any) => {
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
          setSubmitting(false);
        }, 2000)
      } else {
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
