import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
// import { Field, reduxForm } from "redux-form";
import { loginUser } from "../../redux/authReducer";
// import { Input } from "../../utils/FormControls/FormControls";
// import { required, maxLengthCreator } from "../../utils/validators";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from './Login.module.css'
// import { AppStateType } from "../../redux/redux-store";
import { getCaptchaUrl, getIsAuth } from "../../redux/authSelectors";
import { AppDispatch } from "../../redux/redux-store";

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
            <label htmlFor="email">Email: </label>
            <Field name="email" type="text" placeholder="Email" />
            <ErrorMessage name="email">
              {
                (errorMsg) => <div className={s.error}>{errorMsg}</div>
              }
            </ErrorMessage>
          </div>
          <div className={s.form}>
            <label htmlFor="password">Пароль: </label>
            <Field name="password" type="password" placeholder="Пароль" />
            <ErrorMessage name="password">
              {
                (errorMsg) => <div className={s.error}>{errorMsg}</div>
              }
            </ErrorMessage>
          </div>
          <div className={s.form}>
            <Field name="rememberMe" type="checkbox" /> Запомнить меня
          </div>
          {captchaUrl ? 
          <div className={s.form}>
            <img src={captchaUrl} />
            <Field name="captcha" type="text" />
          </div> : null}
          {formik.status ? 
          <div className={s.error}>{formik.status}</div> : null}
          <div>
            <button type="submit" disabled={formik.isSubmitting}>Войти</button>
          </div>
        </Form>}
      </Formik>
    </div>
  );
};

// const maxLength30 = maxLengthCreator(30);

// let LoginForm = (props) => {
//   return (
//     <form onSubmit={props.handleSubmit}>
//       <div>
//         <Field name="email" component={Input} placeholder="email" validate={[required, maxLength30]}/>
//       </div>
//       <div>
//         <Field name="password" component={Input} type="password" placeholder="password" validate={[required, maxLength30]}/>
//       </div>
//       <div>
//         <Field name="rememberMe" component={"input"} type="checkbox" /> remember me
//       </div>
//       {props.captchaUrl && <img src={props.captchaUrl} />}
//       {props.captchaUrl && <Field name="captcha" component={Input} validate={[required]} />}
//       {props.error && <div>{props.error}</div>}
//       <div>
//         <button>Login</button>
//       </div>
//     </form>
//   );
// };

// LoginForm = reduxForm({
//   form: "login",
// })(LoginForm);

// const Login = (props) => {
//   const onSubmit = (formData) => {
//     let { email, password, rememberMe, captcha } = formData;
//     props.loginUser(email, password, rememberMe, captcha);
//     formData.email = "";
//     formData.password = "";
//     formData.rememberMe = false;
//   };
//   if (props.isAuth) {
//     return <Navigate replace to="/profile" />;
//   }
//   return (
//     <div>
//       <h1>Login</h1>
//       <LoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
//     </div>
//   );
// };



export default Login;
