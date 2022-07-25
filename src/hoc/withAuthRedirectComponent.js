import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router";

const mapStateToProps = (state) => {
    return {
      isAuth: state.auth.isAuth,
    };
  };

const withAuthRedirectComponent = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.isAuth) {
        return <Navigate replace to="/login" />;
      }
      return <Component {...this.props} />
    }
  }

  return connect(mapStateToProps)(RedirectComponent);
};

export default withAuthRedirectComponent;
