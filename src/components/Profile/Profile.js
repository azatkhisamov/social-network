import React from "react";
import s from "./Profile.module.css";
import PostsContainer from "./Posts/PostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = React.memo((props) => {
  return (
    <div>
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        authId={props.authId}
        savePhoto={props.savePhoto}
        updateProfileData={props.updateProfileData}
      />
      <PostsContainer />
    </div>
  );
});

export default Profile;
