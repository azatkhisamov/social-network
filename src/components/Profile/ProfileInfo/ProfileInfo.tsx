import React, { useState, useEffect } from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import Status from "./ProfileSections/Status";
import Avatar from "./ProfileSections/Avatar";
import ProfileData from "./ProfileSections/ProfileData";
import UpdateProfileForm from "./ProfileSections/UpdateProfileForm";
import { ProfileType } from "../../../redux/profileReducer";

type PropsType = {
  profile: ProfileType | null
  updateStatus: (status: string) => void
  savePhoto: (imageFile: File) => void
  updateProfileData: (profile: ProfileType, setStatus: React.Dispatch<React.SetStateAction<null | string>>) => void
  status: string
  authId: number | null
}
type StateType = {
  editMode: boolean
}

const ProfileInfo: React.FC<PropsType> = (props: PropsType) => {
  let [editMode, setEditMode] = useState(false);

  // const updateProfile = (formData: ProfileType) => {
  //   debugger;
  //   props.updateProfileData(formData)
  //   setEditMode(false);
  // };

  if (!props.profile) {
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
                updateProfileData={props.updateProfileData}
                initialValues={props.profile}
                deactivateEditMode={() => setEditMode(false)}
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
