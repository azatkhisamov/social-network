import React from "react";
import Post from "./Post/Post";
import s from "./Posts.module.css";
import { actions } from "../../../redux/profileReducer";
import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik';
import * as Yup from 'yup';
import { Avatar, Button, Typography } from "@mui/material";
import TextareaForm from "../../../utils/Forms/TextareaForm";
import { Stack } from "@mui/system";
import { deepOrange } from '@mui/material/colors';
import { useDispatch, useSelector } from "react-redux";
import { getAvatar, getPosts } from "../../../redux/profileSelectors";
import { AppDispatch, AppStateType } from "../../../redux/redux-store";

type PostValuesType = {
  post: string;
}

const Posts: React.FC = () => {

  const posts = useSelector(getPosts);
  const avatar = useSelector(getAvatar);
  const dispatch = useDispatch<AppDispatch>();
  const fullName = useSelector((state: AppStateType) => state.auth.login);

  const initialValues: PostValuesType = { post: '' };

  return (
    <Stack spacing={3}>
      <Typography variant="h4" gutterBottom component="div">Стена</Typography>
      {fullName && <Formik initialValues={initialValues}
        validationSchema={Yup.object({
          post: Yup.string().required('').max(5000, 'Слишком много символов')
        })}
        onSubmit={(values, actionsSubmit) => {
          dispatch(actions.addNewPost(values.post, fullName));
          actionsSubmit.setSubmitting(false);
          actionsSubmit.resetForm();
        }}
      >
        <Form>
          <Stack spacing={2} alignItems="baseline">
            <TextareaForm name='post' label='Новый пост' type='text' />
            <Button variant="contained" type="submit">Добавить</Button>
          </Stack>
        </Form>
      </Formik>}
      {posts
        .map((item) => <Post key={item.id} message={item.message} fullName={item.fullName} />)
        .reverse()}
    </Stack>
  );
};

export default Posts;
