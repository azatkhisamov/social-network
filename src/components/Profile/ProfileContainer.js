import React from "react";
import Profile from "./Profile";
import { setUserProfile } from "../../redux/profileReducer";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { profileAPI } from "../../api/api"

class ProfileContainer extends React.Component {
  componentDidMount() {
    // debugger;
    let userId = this.props.router.params.userId
      ? this.props.router.params.userId
      : this.props.userId;
    if (userId) {
      profileAPI.setUserProfile(userId).then(data => this.props.setUserProfile(data))
    }
  }

  componentDidUpdate() {
    // debugger;
    if (
      this.props.profile.userId !== +this.props.router.params.userId &&
      this.props.profile.userId !== this.props.userId
    ) {
      let userId = this.props.router.params.userId
        ? this.props.router.params.userId
        : this.props.userId;
      profileAPI.setUserProfile(userId).then(data => this.props.setUserProfile(data))
    }
  }

  render() {
    debugger;
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    userId: state.auth.id,
  };
};

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

const containerComponentWithUrlData = withRouter(ProfileContainer);
export default connect(mapStateToProps, { setUserProfile })(
  containerComponentWithUrlData
);
