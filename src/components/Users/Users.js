import React from "react";
import s from "./Users.module.css";
import User from "./User/User";
import Pagination from "./Pagination";

const Users = (props) => {
  
  return (
    <div>
      <h2>Users</h2>
      <Pagination
        totalCount={props.totalCount}
        countUsers={props.countUsers}
        onPaginationClick={props.onPaginationClick}
        currentPage={props.currentPage}
      />
      {props.users.map((user) => (
        <User
          key={user.id}
          user={user}
          followUser={props.followUser}
          unFollowUser={props.unFollowUser}
          followingInProgress={props.followingInProgress}
          authID={props.authID}
        />
      ))}
      <button>Show more</button>
    </div>
  );
};

export default Users;
