import React from "react";
import { connect } from "react-redux";
import {
  getUsers,
  follow,
  unFollow,
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";

class UsersContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsers(
      this.props.users.currentPage,
      this.props.users.countUsers
    );
  }

  onPaginationClick(numberPage) {
    this.props.getUsers(numberPage, this.props.users.countUsers);
  }

  followUser(userID) {
    this.props.follow(userID);
  }

  unFollowUser(userID) {
    this.props.unFollow(userID);
  }

  render() {
    debugger;
    return (
      <React.Fragment>
        {this.props.users.isFetching ? (
          <Preloader />
        ) : (
          <Users
            users={this.props.users}
            onPaginationClick={this.onPaginationClick.bind(this)}
            followUser={this.followUser.bind(this)}
            unFollowUser={this.unFollowUser.bind(this)}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersPage,
  };
};

export default connect(mapStateToProps, {
  getUsers,
  follow,
  unFollow,
})(UsersContainer);
