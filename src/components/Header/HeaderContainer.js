import React from "react";
import s from "./Header.module.css";
import Header from "./Header";
import * as axios from 'axios';
import { connect } from 'react-redux/es/exports';
import { setUserData } from "../../redux/authReducer";

class HeaderContainer extends React.Component {
  
  componentDidMount() {
    axios.get("https://social-network.samuraijs.com/api/1.0//auth/me", {
      withCredentials: true
    }).then(response => {
      if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        this.props.setUserData(id, login, email);
      }
    })
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

export default connect(mapStateToProps, {setUserData})(HeaderContainer);
