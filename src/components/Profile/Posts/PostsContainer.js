import React from "react";
import { addNewPost } from "../../../redux/profileReducer";
import Posts from "./Posts";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.postData
  }
}

const PostsContainer = connect(mapStateToProps, {addNewPost})(Posts);

export default PostsContainer;
