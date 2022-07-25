import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { updateUserProfile, getUserProfile } from "../../redux/profileReducer";
import withRouter from "../../hoc/withRouter";
import withAuthRedirectComponent from "../../hoc/withAuthRedirectComponent";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    // debugger;
    this.props.getUserProfile(this.props.router.params.userId, this.props.userId);
  }

  componentDidUpdate() {
    // debugger;
    this.props.updateUserProfile(this.props.router.params.userId, this.props.profile.userId, this.props.userId)
  }

  render() {
    // debugger;
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    userId: state.auth.id,
  };
};

export default compose(
  withRouter,
  withAuthRedirectComponent,
  connect(mapStateToProps, { updateUserProfile, getUserProfile })
)(ProfileContainer);

