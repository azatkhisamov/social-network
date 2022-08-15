import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { loginUser } from "../../redux/authReducer";
import { Formik, Form, Field} from "formik";
import * as Yup from "yup";
import s from './Login.module.css'
import { getCaptchaUrl, getIsAuth } from "../../redux/authSelectors";
import { AppDispatch } from "../../redux/redux-store";
import InputForm from "../../utils/Forms/InputForm";
import CheckboxForm from "../../utils/Forms/CheckboxForm";
import { Button } from "@mui/material";
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
    <div className={s.loginForm}>
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
          <div className={s.form}>
            <InputForm name='email' type='text' label="Email" />
          </div>
          <div className={s.form}>
            <PasswordForm name='password' label="Пароль" />
          </div>
          <div className={s.form}>
            <CheckboxForm name='rememberMe' type='checkbox' label='Запомнить меня' />
          </div>
          {captchaUrl ? 
          <div className={s.form}>
            <img src={captchaUrl} />
            <Field name="captcha" type="text" />
          </div> : null}
          {formik.status ? 
          <div className={s.error}>{formik.status}</div> : null}
          <div>
            <Button variant="contained" type="submit" disabled={formik.isSubmitting}>Войти</Button>
          </div>
        </Form>}
      </Formik>
    </div>
  );
};

export default Login;
