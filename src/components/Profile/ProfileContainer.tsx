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
} from "../../redux/profileReducer";
import withRouter from "../../hoc/withRouter";
import withAuthRedirectComponent from "../../hoc/withAuthRedirectComponent";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";
import {useParams} from "react-router-dom";

type MapStateToPropsType = {
  profile: ProfileType | null
  authId: number | null
  status: string
}
type MapDispatchToPropsType = {
  getUserProfile: (id: number) => void
    getUserStatus: (userID: number) => void
    updateUserStatus: (status: string) => void
    savePhoto: (imageFile: any) => void
    updateProfileData: (profile: ProfileType, setStatus: React.Dispatch<React.SetStateAction<null | string>>) => void
}
type OwnPropsType = {}
type RouterParamsType = {
  router: any
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType & RouterParamsType;

const ProfileContainer: React.FC<PropsType> = (props: PropsType) => {
  
  let { userId } = useParams();
  useEffect(() => { 
    debugger
    // props.router.params.userId
    // if (userId) {
    let userID = props.router.params.userId || props.authId;
    props.getUserProfile(userID);
    props.getUserStatus(userID);
  }, [props.router.params.userId]);

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
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    profile: state.profilePage.profile,
    authId: state.auth.id,
    status: state.profilePage.status,
  };
};

export default compose<React.ComponentType>(
  withRouter,
  withAuthRedirectComponent,
  connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    updateProfileData,
  })
)(ProfileContainer);

