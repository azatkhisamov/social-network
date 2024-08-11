import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { loginUser } from "../../redux/authReducer";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import s from './Login.module.css'
import { getCaptchaUrl, getIsAuth } from "../../redux/authSelectors";
import { AppDispatch } from "../../redux/redux-store";
import InputForm from "../../utils/Forms/InputForm";
import CheckboxForm from "../../utils/Forms/CheckboxForm";
import { Alert, Button, Stack } from "@mui/material";
import PasswordForm from "../../utils/Forms/PasswordForm";

type LoginFormValues = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string | null
}

const Login: React.FC = () => {

  const isAuth = useSelector(getIsAuth);
  const captchaUrl = useSelector(getCaptchaUrl);
  const dispatch = useDispatch<AppDispatch>();


  if (isAuth) {
    return <Navigate replace to="/profile" />;
  }

  const initialValues: LoginFormValues = { email: '', password: "", rememberMe: false, captcha: "", };

  return (
    <Stack justifyContent="center" alignItems="center" mt={10}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Введите корректный email")
            .max(20, "Email не должен превышать 20 символов")
            .required("Заполните форму"),
          password: Yup.string()
            .min(5, "Пароль должен включать минимум 5 символов")
            .required("Заполните форму"),
        })}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          debugger
          dispatch(loginUser(
            values.email,
            values.password,
            values.rememberMe,
            values.captcha,
            setStatus
          ));
          setSubmitting(false);
        }}
      >
        {(formik) => <Form>
          <Stack spacing={2} alignItems="flex-start">
            <InputForm name='email' type='text' label="Email" />
            <PasswordForm name='password' label="Пароль" />
            <CheckboxForm name='rememberMe' type='checkbox' label='Запомнить меня' />
            {captchaUrl ? <>
              <img src={captchaUrl} />
              <InputForm name='captcha' type='text' label="Captcha" />
            </> : null}
            {formik.status ?
              <Alert severity="error">{formik.status}</Alert> : null}
            <Button variant="contained" type="submit" disabled={formik.isSubmitting}>Войти</Button>
          </Stack>
        </Form>}
      </Formik>
    </Stack>
  );
};

export default Login;
