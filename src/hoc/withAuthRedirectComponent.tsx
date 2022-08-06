import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router";
import { AppStateType } from "../redux/redux-store";

const mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

type MapStateToPropsType = {
  isAuth: boolean
}

function withAuthRedirectComponent<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  const RedirectComponent: React.FC<MapStateToPropsType> = (props) => {
    let {isAuth, ...restProps} = props
    if (!isAuth) {
      return <Navigate replace to="/login" />;
    }
    return <WrappedComponent {...restProps as WCP} />;
  }

  return connect<MapStateToPropsType, {}, WCP, AppStateType>(mapStateToProps, {})(RedirectComponent);
};

export default withAuthRedirectComponent;
