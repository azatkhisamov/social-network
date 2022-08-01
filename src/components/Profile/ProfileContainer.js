import React, { useEffect } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  updateUserStatus,
  getUserProfile,
  getUserStatus,
  savePhoto,
  updateProfileData,
} from "../../redux/profileReducer";
import withRouter from "../../hoc/withRouter";
import withAuthRedirectComponent from "../../hoc/withAuthRedirectComponent";
import { compose } from "redux";

const ProfileContainer = props => {
  
  useEffect(() => {
    let userID = props.router.params.userId || props.authId;
    props.getUserProfile(userID);
    props.getUserStatus(userID);
  }, [props.router.params.userId]);

  return (
    <Profile
      {...props}
      profile={props.profile}
      updateStatus={props.updateUserStatus}
      status={props.status}
      savePhoto={props.savePhoto}
      updateProfileData={props.updateProfileData}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    authId: state.auth.id,
    status: state.profilePage.status,
  };
};

export default compose(
  withRouter,
  withAuthRedirectComponent,
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    updateProfileData,
  })
)(ProfileContainer);

