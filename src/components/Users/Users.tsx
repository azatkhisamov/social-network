import React from "react";
import s from "./Users.module.css";
import User from "./User/User";
import Pagination from "./Pagination";
import { UsersType } from "../../redux/usersReducer";
import FilterUsersForm from "./FilterUsersForm";
import { Stack, Typography } from "@mui/material";

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

const Users: React.FC<PropsType> = React.memo((props: PropsType) => {

  return (
    <Stack spacing={4}>
      <Typography variant="h4" gutterBottom component="div">Пользователи</Typography>
      <FilterUsersForm filterUsers={props.filterUsers} isAuth={props.isAuth} query={props.query} />
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
    </Stack>
  );
});

export default Users;
