import React from "react";
import s from "./Users.module.css";
import User from "./User/User";

const Users = (props) => {
  let amountPages = Math.ceil(
    props.users.totalCount / props.users.countUsers / 200
  );
  let pages = [];
  for (let i = 1; i <= amountPages; i++) {
    pages.push(i);
  }
  return (
    <div>
      <h2>Users</h2>
      <div className={s.pagination}>
        {pages.map((page) => {
          return (
            <span
              key={page}
              onClick={() => props.onPaginationClick(page)}
              className={props.users.currentPage === page && s.selected}
            >
              {page}
            </span>
          );
        })}
      </div>
      {props.users.users.map((user) => (
        <User
          key={user.id}
          info={user}
          followUnfollow={props.followUnfollow}
          followUser={props.followUser}
          unFollowUser={props.unFollowUser}
        />
      ))}
      <button>Show more</button>
    </div>
  );
};

export default Users;
