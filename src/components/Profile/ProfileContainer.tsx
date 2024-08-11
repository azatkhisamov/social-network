import React, { useEffect } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  updateUserStatus,
  getUserProfile,
  getUserStatus,
  savePhoto,
  updateProfileData,
  ProfileType,
  actions
} from "../../redux/profileReducer";
import { AppStateType } from "../../redux/redux-store";
import { Navigate, useParams } from "react-router-dom";

type MapStateToPropsType = {
  profile: ProfileType | null
  authId: number | null
  status: string
  isAuth: boolean
}
type MapDispatchToPropsType = {
  getUserProfile: (id: number) => void
  getUserStatus: (userID: number) => void
  updateUserStatus: (status: string) => void
  savePhoto: (imageFile: any) => void
  updateProfileData: (profile: ProfileType) => void
  setUserProfile: (profile: ProfileType | null) => void
  setUserStatus: (status: string) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const ProfileContainer: React.FC<PropsType> = React.memo((props: PropsType) => {

  let { userId } = useParams();
  useEffect(() => {
    debugger
    let userID = userId || props.authId;
    if (userID) {
      props.getUserProfile(+userID);
      props.getUserStatus(+userID);
    }

    return () => {
      props.setUserProfile(null);
      props.setUserStatus('');
    }
  }, [userId]);

  if (!userId && !props.isAuth) {
    return <Navigate replace to="/login" />
  }

  return (
    <Profile
      profile={props.profile}
      updateStatus={props.updateUserStatus}
      status={props.status}
      savePhoto={props.savePhoto}
      updateProfileData={props.updateProfileData}
      authId={props.authId}
    />
  );
});

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    profile: state.profilePage.profile,
    authId: state.auth.id,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
  };
};

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  savePhoto,
  updateProfileData,
  setUserProfile: actions.setUserProfile,
  setUserStatus: actions.setUserStatus
})(ProfileContainer);

