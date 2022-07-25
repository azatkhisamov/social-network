import React from "react";
import s from "./Header.module.css";
import Header from "./Header";
import { connect } from 'react-redux/es/exports';
import { getAuthUserData } from "../../redux/authReducer";

class HeaderContainer extends React.Component {
  
  componentDidMount() {
    this.props.getAuthUserData();
  }
  
  render() {
    return (
      <Header {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);
