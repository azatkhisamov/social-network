import React from "react";
import Post from "./Post/Post";
import s from "./Posts.module.css";

const Posts = (props) => {

  const addNewPost = () => {
    props.addNewPost();
  }

  const updatePost = (event) => {
    let targetValue = event.target.value;
    props.updatePost(targetValue);
  }

  return (
    <div className={s.posts}>
      <div>
        <h2>My posts</h2>
        <div>
          <textarea value={props.state.newPost} onChange={updatePost}></textarea>
        </div>
        <div>
          <button onClick={addNewPost}>Добавить</button>
        </div>
      </div>
      {props.state.postData.map((item) => (
        <Post key={item.id} message={item.message} />
      )).reverse()}
    </div>
  );
};

export default Posts;
