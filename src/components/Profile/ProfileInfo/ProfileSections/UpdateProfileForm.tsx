import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ProfileType } from "../../../../redux/profileReducer";
import s from "../ProfileInfo.module.css";
import InputForm from "../../../../utils/Forms/InputForm";
import CheckboxForm from "../../../../utils/Forms/CheckboxForm";
import { Alert, Button, Stack, Typography } from "@mui/material";

type PropsType = {
  initialValues: ProfileType
  deactivateEditMode: () => void
  profile: ProfileType
  updateProfileData: (profile: ProfileType) => void
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

  return (
    <>
      <Formik initialValues={props.initialValues}
        onSubmit={(values, actions) => {
          props.updateProfileData(values);
          props.deactivateEditMode();
          actions.setSubmitting(false);
        }}
        validationSchema={validation}
      >
        {formik =>
          <Form>
            <Stack spacing={3} alignItems="flex-start">
            <InputForm name='aboutMe' label="О себе" type="text" />
            <InputForm name='fullName' label="Полное имя" type="text" />
            <CheckboxForm name='lookingForAJob' label="Поиск работы" type="checkbox" />
            <InputForm name='lookingForAJobDescription' label="Профессиональные умения" type="text" />
            <Typography variant="subtitle2" sx={{fontSize: '18px'}}><b>Контакты: </b></Typography>
            {Object.keys(props.profile.contacts).map(contact => {
              return <div className={s.form} key={contact}>
                <InputForm name={"contacts." + contact} label={contact} type="text" key={contact} />
              </div>
            })}
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained" color="success" disabled={formik.isSubmitting}>Сохранить</Button>
              <Button variant="contained" color="error" onClick={props.deactivateEditMode}>
                Отмена
              </Button>
            </Stack>
          </Stack>
          </Form>}
    </Formik>
    </>
  );
};


export default UpdateProfileForm;
