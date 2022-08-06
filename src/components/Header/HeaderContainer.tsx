import React from "react";
import s from "./Header.module.css";
import Header from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/authReducer";
import { AppStateType } from "../../redux/redux-store";

type MapStateToPropsType = {
  isAuth: boolean
}
type MapDispatchToPropsTypetype = {
  logout: () => void
}

class HeaderContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsTypetype> {
  
  render() {
    return (
      <Header {...this.props} />
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {logout})(HeaderContainer);
