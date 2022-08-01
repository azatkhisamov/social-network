import React from "react";
import { connect } from "react-redux";
import {
  requestUsers,
  follow,
  unFollow,
  setCurrentPage,
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { getCountUsers, getCurrentPage, getFollowingInProgress, getIsFetching, getTotalCount, getUsers } from "../../redux/usersSelectors";

class UsersContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestUsers(
      this.props.currentPage,
      this.props.countUsers
    );
  }

  componentWillUnmount() {
    this.props.setCurrentPage(1);
  }

  onPaginationClick(numberPage) {
    this.props.requestUsers(numberPage, this.props.countUsers);
  }

  followUser(userID) {
    this.props.follow(userID);
  }

  unFollowUser(userID) {
    this.props.unFollow(userID);
  }

  render() {
    // debugger;
    return (
      <React.Fragment>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            users={this.props.users}
            currentPage={this.props.currentPage}
            totalCount={this.props.totalCount}
            countUsers={this.props.countUsers}
            followingInProgress={this.props.followingInProgress}
            onPaginationClick={this.onPaginationClick.bind(this)}
            followUser={this.followUser.bind(this)}
            unFollowUser={this.unFollowUser.bind(this)}
            authID={this.props.authID}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    currentPage: getCurrentPage(state),
    totalCount: getTotalCount(state),
    countUsers: getCountUsers(state),
    followingInProgress: getFollowingInProgress(state),
    isFetching: getIsFetching(state),
    authID: state.auth.id,
  };
};

export default connect(mapStateToProps, {
  requestUsers,
  follow,
  unFollow,
  setCurrentPage
})(UsersContainer);
