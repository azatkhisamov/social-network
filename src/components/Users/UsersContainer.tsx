import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  requestUsers,
  follow,
  unFollow,
  actions, // чекнуть потом
  UsersType,
  FilterUsersType,
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { getCountUsers, getCurrentPage, getFollowingInProgress, getIsFetching, getTotalCount, getUsers, getFilterUsers } from "../../redux/usersSelectors";
import { AppStateType } from "../../redux/redux-store";
import {
  useQueryParams,
  StringParam,
  NumberParam,
  BooleanParam,
} from 'use-query-params';


type MapStateToPropsType = {
  users: Array<UsersType>
  currentPage: number
  totalCount: number
  countUsers: number
  followingInProgress: Array<number>
  isFetching: boolean
  authID: number | null
  isAuth: boolean
  filterUsers: FilterUsersType
}
type MapDispatchToPropsType = {
  requestUsers: (page: number, count: number, filterUsers: FilterUsersType) => void
  follow: (userID: number) => void
  unFollow: (userID: number) => void
  setCurrentPage: (numberPage: number) => void //чекнуть потом
  setFilterUsers: (term: string, friend: null | boolean) => void //чекнуть потом
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const UsersContainer: React.FC<PropsType> = (props) => {

  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    term: StringParam,
    friend: BooleanParam
  });

  useEffect(() => {
    debugger
    let actualPage = props.currentPage;
    if (!!query.page) actualPage = query.page;
    let filter = {term: '', friend: null as null | boolean};
    if (!!query.term) filter = {...filter, term: query.term};
    if (query.friend !== undefined) filter = {...filter, friend: query.friend};
    props.requestUsers(
      actualPage,
      props.countUsers,
      filter || props.filterUsers,
    );
  }, [query])

  useEffect(() => {
    debugger
    let search: any = {};
    if (props.currentPage !== 1) search = { ...search, page: props.currentPage };
    if (props.filterUsers.term !== '') search = { ...search, term: props.filterUsers.term };
    if (props.filterUsers.friend !== null) search = { ...search, friend: props.filterUsers.friend };
    setQuery(search, 'push')
  }, [props.currentPage])

  useEffect(() => {
    debugger
    let search: any = {};
    search = { ...search, page: 1 };
    if (props.filterUsers.term !== '') search = { ...search, term: props.filterUsers.term };
    if (props.filterUsers.friend !== null) search = { ...search, friend: props.filterUsers.friend };
    setQuery(search, 'push')
  }, [props.filterUsers])


  // useEffect(() => {
  //   return () => {
  //     props.setCurrentPage(1);
  //     props.setFilterUsers('', null);
  //   }
  // }, [])

  const onPaginationClick = (numberPage: number) => {
    debugger
    props.requestUsers(numberPage, props.countUsers, props.filterUsers);
  }

  const followUser = (userID: number) => {
    props.follow(userID);
  }

  const unFollowUser = (userID: number) => {
    props.unFollow(userID);
  }

  const filterUsers = (term: string, friend: null | boolean) => {
    props.setFilterUsers(term, friend);
  }
  debugger
  return (
    <React.Fragment>
      {props.isFetching ? (
        <Preloader />
      ) : (
        <Users
          users={props.users}
          currentPage={props.currentPage}
          totalCount={props.totalCount}
          countUsers={props.countUsers}
          followingInProgress={props.followingInProgress}
          onPaginationClick={onPaginationClick} //
          followUser={followUser} //
          unFollowUser={unFollowUser} //
          authID={props.authID}
          filterUsers={filterUsers} //
          isAuth={props.isAuth}
          query={query}
        />
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    users: getUsers(state),
    currentPage: getCurrentPage(state),
    totalCount: getTotalCount(state),
    countUsers: getCountUsers(state),
    followingInProgress: getFollowingInProgress(state),
    isFetching: getIsFetching(state),
    authID: state.auth.id,
    isAuth: state.auth.isAuth,
    filterUsers: getFilterUsers(state),
  };
};

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
  requestUsers,
  follow,
  unFollow,
  setCurrentPage: actions.setCurrentPage,
  setFilterUsers: actions.setFilterUsers
})(UsersContainer);
