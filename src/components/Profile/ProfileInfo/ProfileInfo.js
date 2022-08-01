import React, { useState, useEffect } from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import Status from "./ProfileSections/Status";
import Avatar from "./ProfileSections/Avatar";
import ProfileData from "./ProfileSections/ProfileData";
import UpdateProfileForm from "./ProfileSections/UpdateProfileForm";

const ProfileInfo = (props) => {
  let [editMode, setEditMode] = useState(false);

  const updateProfile = (formData) => {
    debugger;
    props.updateProfileData(formData).then(() => setEditMode(false));
    // setEditMode(false);
  };

  if (props.profile.length === 0) {
    return <Preloader />;
  }
  return (
    <React.Fragment>
      <div className={s.imageHead}></div>
      <div className={s.info}>
        <div className={s.avatar}>
          <Avatar
            photo={props.profile.photos.large}
            savePhoto={props.savePhoto}
            authId={props.authId}
            profileId={props.profile.userId}
          />
        </div>
        <div className={s.description}>
          <div>
            <span className={s.userName}>{props.profile.fullName}</span>
          </div>
          <div>
            <Status
              status={props.status}
              authId={props.authId}
              updateStatus={props.updateStatus}
              profileId={props.profile.userId}
            />
          </div>
          <div className={s.information}>
            {!editMode ? (
              <ProfileData
                profile={props.profile}
                authId={props.authId}
                activateEditMode={() => setEditMode(true)}
              />
            ) : (
              <UpdateProfileForm
                onSubmit={updateProfile}
                initialValues={props.profile}
                cancelUpdate={() => setEditMode(false)}
                profile={props.profile}
              />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileInfo;
