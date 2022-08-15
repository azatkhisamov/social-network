import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ProfileType } from "../../../../redux/profileReducer";
import s from "../ProfileInfo.module.css";
import InputForm from "../../../../utils/Forms/InputForm";
import CheckboxForm from "../../../../utils/Forms/CheckboxForm";
import { Button, Stack } from "@mui/material";

type PropsType = {
  initialValues: ProfileType
  deactivateEditMode: () => void
  profile: ProfileType
  updateProfileData: (profile: ProfileType, setStatus: React.Dispatch<React.SetStateAction<null | string>>) => void
}

const validation = Yup.object({
  aboutMe: Yup.string().required('Заполните форму').max(100, 'Форма не должна превышать 100 символов'),
  fullName: Yup.string().required('Заполните форму').max(30, 'Полное имя не должно превышать 30 символов'),
  lookingForAJobDescription: Yup.string().max(100, 'Форма не должна превышать 100 символов'),
  contacts: Yup.object({
    github: Yup.string().url('Введите корректный url').nullable(),
    vk: Yup.string().url('Введите корректный url').nullable(),
    facebook: Yup.string().url('Введите корректный url').nullable(),
    instagram: Yup.string().url('Введите корректный url').nullable(),
    twitter: Yup.string().url('Введите корректный url').nullable(),
    website: Yup.string().url('Введите корректный url').nullable(),
    youtube: Yup.string().url('Введите корректный url').nullable(),
    mainLink: Yup.string().url('Введите корректный url').nullable()
  })
})


const UpdateProfileForm: React.FC<PropsType> = (props) => {

  const [status, setStatus] = useState(null as null | string);
  debugger
  return (
    <>
      <Formik initialValues={props.initialValues}
        onSubmit={(values, actions) => {
          props.updateProfileData(values, setStatus);
          if (!status) {
            props.deactivateEditMode();
            actions.setSubmitting(false);
          }
        }}
        validationSchema={validation}
      >
        {formik =>
          <Form>
            <div className={s.form}>
              {/* <label htmlFor="aboutMe">О себе:</label>
              <Field name="aboutMe" type="text" placeholder="О себе" />
              <ErrorMessage name="aboutMe">
                {
                  (errorMsg) => <div className={s.error}>{errorMsg}</div>
                }
              </ErrorMessage> */}
              <InputForm name='aboutMe' label="О себе" type="text" />
            </div>
            <div className={s.form}>
              {/* <label htmlFor="fullName">Полное имя:</label>
              <Field name="fullName" type="text" placeholder="Полное имя" />
              <ErrorMessage name="fullName">
                {
                  (errorMsg) => <div className={s.error}>{errorMsg}</div>
                }
              </ErrorMessage> */}
              <InputForm name='fullName' label="Полное имя" type="text" />
            </div>
            <div className={s.form}>
              {/* <label htmlFor="lookingForAJob">Поиск работы:</label>
              <Field name="lookingForAJob" type="checkbox" /> */}
              <CheckboxForm name='lookingForAJob' label="Поиск работы" type="checkbox" />
            </div>
            <div className={s.form}>
              {/* <label htmlFor="lookingForAJobDescription">Профессиональные умения:</label>
              <Field name="lookingForAJobDescription" as='textarea' placeholder="Профессиональные умения" />
              <ErrorMessage name="lookingForAJobDescription">
                {
                  (errorMsg) => <div className={s.error}>{errorMsg}</div>
                }
              </ErrorMessage> */}
              <InputForm name='lookingForAJobDescription' label="Профессиональные умения" type="text" />
            </div>
            <div>
              <b>Контакты: </b>
              {Object.keys(props.profile.contacts).map(contact => {
                return <div className={s.form} key={contact}>
                  {/* <label htmlFor={"contacts." + contact}>{contact}</label>
                  <Field name={"contacts." + contact} type='text' placeholder={contact} />
                  <ErrorMessage name={"contacts." + contact}>
                    {
                      (errorMsg) => <div className={s.error}>{errorMsg}</div>
                    }
                  </ErrorMessage> */}
                  <InputForm name={"contacts." + contact} label={contact} type="text" />
                </div>
              })}
            </div>
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained" color="success" disabled={formik.isSubmitting}>Сохранить</Button>
              <Button variant="contained" color="error" onClick={props.deactivateEditMode}>
                Отмена
              </Button>
            </Stack>
          </Form>}
      </Formik>
    </>
  );
};


export default UpdateProfileForm;
