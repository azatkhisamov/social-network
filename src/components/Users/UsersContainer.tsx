import React, { useEffect, useLayoutEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  requestUsers,
  follow,
  unFollow,
  actions
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { getCountUsers, getCurrentPage, getFollowingInProgress, getIsFetching, getTotalCount, getUsers, getFilterUsers } from "../../redux/usersSelectors";
import { AppDispatch } from "../../redux/redux-store";
import {
  useQueryParams,
  StringParam,
  NumberParam,
  BooleanParam,
} from 'use-query-params';
import { getAuthId, getIsAuth } from "../../redux/authSelectors";

const UsersContainer: React.FC = () => {

  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    term: StringParam,
    friend: BooleanParam
  });

  const users = useSelector(getUsers);
  const currentPage = useSelector(getCurrentPage);
  const totalCount = useSelector(getTotalCount);
  const countUsers = useSelector(getCountUsers);
  const followingInProgress = useSelector(getFollowingInProgress);
  const isFetching = useSelector(getIsFetching);
  const filter = useSelector(getFilterUsers);
  const authID = useSelector(getAuthId);
  const isAuth = useSelector(getIsAuth);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    debugger
    let actualPage = currentPage;
    if (!!query.page) actualPage = query.page;
    let queryFilter = { term: '', friend: null as null | boolean };
    // let queryFilter = filter;
    if (!!query.term) queryFilter = { ...queryFilter, term: query.term };
    if (query.friend || query.friend === false) queryFilter = { ...queryFilter, friend: query.friend };
    dispatch(requestUsers(
      actualPage,
      countUsers,
      queryFilter || filter,
    ));
  }, [query])

  useEffect(() => {
    debugger
    if (totalCount) {
      let search: any = {};
      if (currentPage !== 1) search = { ...search, page: currentPage };
      if (filter.term !== '') search = { ...search, term: filter.term };
      if (filter.friend !== null
      ) search = { ...search, friend: filter.friend };
      setQuery(search, 'push')
    }
  }, [currentPage])

  useEffect(() => {
    debugger
    if (totalCount) {
      let search: any = {};
      // search = { ...search, page: 1 };
      // dispatch(actions.setCurrentPage(1));
      if (filter.term !== '') search = { ...search, term: filter.term };
      if (filter.friend !== null) search = { ...search, friend: filter.friend };
      setQuery(search, 'push')
    }
  }, [filter])

  useEffect(() => {
    debugger
    dispatch(actions.setCurrentPage(query.page || 1));
    filterUsers(query.term || "", query.friend ? true : query.friend === false ? false : null);
  }, [])


  useEffect(() => {
    return () => {
      dispatch(actions.setCurrentPage(1));
      dispatch(actions.setFilterUsers('', null));
    }
  }, [])

  const onPaginationClick = (numberPage: number) => {
    debugger
    // props.requestUsers(numberPage, props.countUsers, props.filterUsers);
    dispatch(actions.setCurrentPage(numberPage));
  }

  const followUser = (userID: number) => {
    dispatch(follow(userID))
  }

  const unFollowUser = (userID: number) => {
    dispatch(unFollow(userID))
  }

  const filterUsers = (term: string, friend: null | boolean) => {
    dispatch(actions.setCurrentPage(1));
    dispatch(actions.setFilterUsers(term, friend));
  }
  debugger
  return (
    <React.Fragment>
      {isFetching ? (
        <Preloader />
      ) : (
        <Users
          users={users}
          currentPage={currentPage}
          totalCount={totalCount}
          countUsers={countUsers}
          followingInProgress={followingInProgress}
          onPaginationClick={onPaginationClick}
          followUser={followUser}
          unFollowUser={unFollowUser}
          authID={authID}
          filterUsers={filterUsers}
          isAuth={isAuth}
          query={query}
        />
      )}
    </React.Fragment>
  );
}

export default UsersContainer;

