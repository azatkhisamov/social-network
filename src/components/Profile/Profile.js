import React from "react";
import s from './Profile.module.css';
import PostsContainer from './Posts/PostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo />
      <PostsContainer state={props.state} dispatch={props.dispatch} />
    </div>
  );
};

export default Profile;
