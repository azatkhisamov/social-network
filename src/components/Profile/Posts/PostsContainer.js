import React from "react";
import { addNewPost, updatePost } from "../../../redux/profileReducer";
import Posts from "./Posts";
import { connect } from "react-redux/es/exports";

const mapStateToProps = (state) => {
  return {
    profilePage: state.profilePage
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addNewPost: () => dispatch(addNewPostActionCreator()),
//     updatePost: (targetValue) => dispatch(updatePostActionCreator(targetValue))
//   }
// }

const PostsContainer = connect(mapStateToProps, {addNewPost, updatePost})(Posts);

export default PostsContainer;
