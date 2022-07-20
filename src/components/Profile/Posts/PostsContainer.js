import React from "react";
import { addNewPostActionCreator, updatePostActionCreator } from "../../../redux/profileReducer";
import Posts from "./Posts";

const PostsContainer = (props) => {

  const addNewPost = () => {
    props.dispatch(addNewPostActionCreator());
  }

  const updatePost = (targetValue) => {
    props.dispatch(updatePostActionCreator(targetValue))
  }

  return (
    <Posts addNewPost={addNewPost} updatePost={updatePost} state={props.state} />);
};

export default PostsContainer;
