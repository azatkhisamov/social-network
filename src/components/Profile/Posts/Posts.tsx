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
import { Avatar, Button } from "@mui/material";
import TextareaForm from "../../../utils/Forms/TextareaForm";
import { Stack } from "@mui/system";
import { deepOrange } from '@mui/material/colors';
import { useDispatch, useSelector } from "react-redux";
import { getAvatar, getPosts } from "../../../redux/profileSelectors";
import { AppDispatch } from "../../../redux/redux-store";

type PostValuesType = {
  post: string;
}

const Posts: React.FC = () => {

  const posts = useSelector(getPosts);
  const avatar = useSelector(getAvatar);
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: PostValuesType = { post: '' };

  return (
    <div className={s.posts}>
      <div>
        <h2>My posts</h2>
        <Formik initialValues={initialValues}
          validationSchema={Yup.object({
            post: Yup.string().required('').max(5000, 'Слишком много символов')
          })}
          onSubmit={(values, actionsSubmit) => {
            dispatch(actions.addNewPost(values.post))
            actionsSubmit.setSubmitting(false);
            actionsSubmit.resetForm();
          }}
        >
          <Form>
            <Stack spacing={2} alignItems="baseline">
              <Stack direction="row" spacing={1}>
                {avatar ? <Avatar src={avatar} sx={{ width: 70, height: 70 }} /> 
                : <Avatar
                sx={{ bgcolor: deepOrange[500] }}
                alt="Remy Sharp"
                src="/broken-image.jpg"
              />}
                <TextareaForm name='post' label='Новый пост' type='text' />
              </Stack>      
              <Button variant="contained" type="submit">Добавить</Button>
            </Stack>
          </Form>
        </Formik>
      </div>
      {posts
        .map((item) => <Post key={item.id} message={item.message} />)
        .reverse()}
    </div>
  );
};

export default Posts;
