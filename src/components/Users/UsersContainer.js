import React from "react";
import { connect } from "react-redux";
import {
  followUnfollow,
  setUsers,
  setCurrentPage,
  setTotalCount,
  loading,
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { usersAPI } from "../../api/api"

class UsersContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    usersAPI.getUsers(this.props.currentPage, this.props.countUsers).then(data => {
      this.props.setTotalCount(data.totalCount);
        this.props.setUsers(data.items);
        this.props.loading();
    })
  }

  onPaginationClick(numberPage) {
    this.props.setCurrentPage(numberPage);
    this.props.loading();
    usersAPI.getUsers(numberPage, this.props.countUsers).then(data => {
        this.props.setUsers(data.items);
        this.props.loading();
    })
  }

  followUser(userID) {
    usersAPI.followUser(userID).then(data => {
      if (data.resultCode === 0) {
        this.props.followUnfollow(userID)
      }
    })
  }

  unFollowUser(userID) {
    usersAPI.unFollowUser(userID).then(data => {
      if (data.resultCode === 0) {
        this.props.followUnfollow(userID)
      }
    })
  }

  render() {
    // debugger;
    return (
      <React.Fragment>
        {this.props.users.isFetching ? (
          <Preloader />
        ) : (
          <Users
            users={this.props.users}
            onPaginationClick={this.onPaginationClick.bind(this)}
            followUnfollow={this.props.followUnfollow}
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

export default connect(mapStateToProps, {followUnfollow, setUsers, setCurrentPage, setTotalCount, loading})(UsersContainer);
