import React from "react";
import Post from "./Post/Post";
import s from "./Posts.module.css";
import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik';
import * as Yup from 'yup';
import { PostDataType } from "../../../redux/profileReducer";

type PostValuesType = {
  post: string;
}

type PropsType = {
  posts: Array<PostDataType>
  addNewPost: (post: string) => void
}

const Posts: React.FC<PropsType> = (props) => {

  const initialValues: PostValuesType = { post: '' };

  return (
    <div className={s.posts}>
      <div>
        <h2>My posts</h2>
        <Formik initialValues={initialValues}
          validationSchema={Yup.object({
            post: Yup.string().required('').max(5000, 'Слишком много символов')
          })}
          onSubmit={(values, actions) => {
            props.addNewPost(values.post);
            actions.setSubmitting(false);
          }}
        >
          <Form>
            <div>
              <Field name='post' as='textarea' placeholder='Напишите пост' />
              <ErrorMessage name='post' className={s.error} />
            </div>
            <div>
              <button type="submit">Добавить</button>
            </div>
          </Form>
        </Formik>
      </div>
      {props.posts
        .map((item) => <Post key={item.id} message={item.message} />)
        .reverse()}
    </div>
  );
};

export default Posts;
