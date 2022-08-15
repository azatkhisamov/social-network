import React from "react";
import s from "./Profile.module.css";
import Posts from "./Posts/Posts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { ProfileType } from "../../redux/profileReducer";

type PropsType = {
  profile: ProfileType | null
  updateStatus: (status: string) => void
  savePhoto: (imageFile: any) => void
  updateProfileData: (profile: ProfileType, setStatus: React.Dispatch<React.SetStateAction<null | string>>) => void
  status: string
  authId: number | null
}

const Profile: React.FC<PropsType> = React.memo((props: PropsType) => {
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
      <Posts />
    </div>
  );
});

export default Profile;
