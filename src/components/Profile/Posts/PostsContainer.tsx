import React from "react";
import { actions } from "../../../redux/profileReducer";
import Posts from "./Posts";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.postData
  }
}

const PostsContainer = connect(mapStateToProps, {addNewPost: actions.addNewPost})(Posts);

export default PostsContainer;
