import React from "react";
import s from "./Profile.module.css";
import Posts from "./Posts/Posts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { ProfileType } from "../../redux/profileReducer";
import { Stack } from "@mui/system";

type PropsType = {
  profile: ProfileType | null
  updateStatus: (status: string) => void
  savePhoto: (imageFile: any) => void
  updateProfileData: (profile: ProfileType) => void
  status: string
  authId: number | null
}

const Profile: React.FC<PropsType> = React.memo((props: PropsType) => {
  return (
    <Stack spacing={6}>
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        authId={props.authId}
        savePhoto={props.savePhoto}
        updateProfileData={props.updateProfileData}
      />
      <Posts />
    </Stack>
  );
});

export default Profile;
