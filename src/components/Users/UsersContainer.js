import React from "react";
import { connect } from "react-redux";
import { followUnfollowAC, setUsersAC } from "../../redux/usersReducer";
import Users from "./Users";

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        followUnfollow: (userID) => dispatch(followUnfollowAC(userID)),
        setUsers: (users) => dispatch(setUsersAC(users)),
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;