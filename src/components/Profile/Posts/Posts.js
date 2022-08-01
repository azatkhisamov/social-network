import React from "react";
import Post from "./Post/Post";
import s from "./Posts.module.css";
import { Field, reduxForm } from "redux-form";
import {required, maxLengthCreator} from "../../../utils/validators";
import { Textarea } from "../../../utils/FormControls/FormControls";

const maxLength50 = maxLengthCreator(50);

let PostForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name='post'
          component={Textarea}
          placeholder='Добавьте пост'
          validate={[required, maxLength50]}
        />
      </div>
      <div>
        <button>Добавить</button>
      </div>
    </form>
  );
};

PostForm = reduxForm({
  form: 'Post'
})(PostForm);

const Posts = props => {
  
  const onSubmit = (formData) => {
    props.addNewPost(formData.post);
    formData.post = ''
  };

  return (
    <div className={s.posts}>
      <div>
        <h2>My posts</h2>
        <PostForm onSubmit={onSubmit}/>
      </div>
      {props.posts
        .map((item) => <Post key={item.id} message={item.message} />)
        .reverse()}
    </div>
  );
};

export default Posts;
