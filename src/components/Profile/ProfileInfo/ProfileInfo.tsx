import React, { useState, useEffect } from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import Status from "./ProfileSections/Status";
import UserAvatar from "./ProfileSections/UserAvatar";
import ProfileData from "./ProfileSections/ProfileData";
import UpdateProfileForm from "./ProfileSections/UpdateProfileForm";
import { ProfileType } from "../../../redux/profileReducer";
import { Stack } from "@mui/system";
import { Divider, Typography } from "@mui/material";

type PropsType = {
  profile: ProfileType | null
  updateStatus: (status: string) => void
  savePhoto: (imageFile: File) => void
  updateProfileData: (profile: ProfileType) => void
  status: string
  authId: number | null
}

const ProfileInfo: React.FC<PropsType> = React.memo((props: PropsType) => {
  let [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <Stack spacing={15} direction='row' alignItems="flex-start">
      <UserAvatar
        photo={props.profile.photos.large}
        savePhoto={props.savePhoto}
        authId={props.authId}
        profileId={props.profile.userId}
        fullName={props.profile.fullName}
      />
      <Stack spacing={5} sx={{ width: '400px' }}>
        <Stack spacing={0}>
          <Typography variant="h4">
            {props.profile.fullName}
          </Typography>
          <Status
            status={props.status}
            authId={props.authId}
            updateStatus={props.updateStatus}
            profileId={props.profile.userId}
          />
          <Divider />
        </Stack>
        <Stack>
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
        </Stack>
      </Stack>
    </Stack>
  );
});

export default ProfileInfo;


{/* <React.Fragment>
<div className={s.info}>
  <div className={s.avatar}>
    <UserAvatar
      photo={props.profile.photos.large}
      savePhoto={props.savePhoto}
      authId={props.authId}
      profileId={props.profile.userId}
      fullName={props.profile.fullName}
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
</React.Fragment> */}