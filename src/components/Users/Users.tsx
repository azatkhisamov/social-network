import React from "react";
import s from "./Users.module.css";
import User from "./User/User";
import Pagination from "./Pagination";
import { UsersType } from "../../redux/usersReducer";
import FilterUsersForm from "./FilterUsersForm";
import { DecodedValueMap } from "use-query-params";

type PropsType = {
  users: Array<UsersType>
  totalCount: number
  countUsers: number
  onPaginationClick: (numberPage: number) => void
  currentPage: number
  followUser: (userID: number) => void
  unFollowUser: (userID: number) => void
  followingInProgress: Array<number>
  authID: number | null
  filterUsers: (term: string, friend: null | boolean) => void
  isAuth: boolean
  query: any //
}

const Users: React.FC<PropsType> = (props: PropsType) => {
  
  return (
    <div>
      <div className={s.heading}>
        <h2>Пользователи</h2>
      </div>
      <div className={s.form}>
        <FilterUsersForm filterUsers={props.filterUsers} isAuth={props.isAuth} query={props.query} />
      </div>
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
