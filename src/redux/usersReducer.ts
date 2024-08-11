import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/api";
import { PhotosProfileType } from "./profileReducer";
import { AppStateType, InferActionsTypes } from "./redux-store";

export type UsersType = {
  name: string
  id: number
  photos: PhotosProfileType
  status: string | null
  followed: boolean
}
export type FilterUsersType = {
  term: string
  friend: null | boolean
}
let initialState = {
  users: [] as Array<UsersType>,
  countUsers: 10,
  totalCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
  filterUsers: {term: '', friend: null} as FilterUsersType,
  changingFriends: false,
};

export type InitialStateType = typeof initialState;

let usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'users/FOLLOW_UNFOLLOW':
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userID) {
            return { ...user, followed: !user.followed };
          }
          return user;
        }),
      };
    case 'users/SET_USERS':
      return {
        ...state,
        users: [...action.users],
      };
    case 'users/SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.numberPage,
      };
    case 'users/SET_TOTAL_COUNT':
      return {
        ...state,
        totalCount: action.totalCount,
      };
    case 'users/LOADING':
      return {
        ...state,
        isFetching: !state.isFetching,
      };
    case 'users/FOLLOWING_PROGRESS':
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userID]
          : state.followingInProgress.filter((id) => id !== action.userID),
      };
    case 'users/SET_FILTER_USERS': 
      return {
        ...state,
        filterUsers: action.payload
      }
    case 'users/CHANGE_FRIENDS': 
      return {
        ...state, 
        changingFriends: !state.changingFriends,
      }
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  followUnfollow: (userID: number) => ({
    type: 'users/FOLLOW_UNFOLLOW',
    userID: userID,
  } as const),
  setUsers: (users: Array<UsersType>) => ({
    type: 'users/SET_USERS',
    users: users,
  } as const),
  setCurrentPage: (numberPage: number) => ({
    type: 'users/SET_CURRENT_PAGE',
    numberPage: numberPage,
  } as const),
  setTotalCount: (totalCount: number) => ({
    type: 'users/SET_TOTAL_COUNT',
    totalCount: totalCount,
  } as const),
  loading: () => ({
    type: 'users/LOADING',
  } as const),
  followingProgress: (isFetching: boolean, userID: number) => ({
    type: 'users/FOLLOWING_PROGRESS',
    isFetching,
    userID,
  } as const),
  setFilterUsers: (term: string, friend: null | boolean) => ({
    type: 'users/SET_FILTER_USERS',
    payload: {term, friend}
  } as const),
  changeFriends: () => ({
    type: 'users/CHANGE_FRIENDS',
  } as const),
}

// export const setCurrentPage = actions.setCurrentPage; //чекнуть потом

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const requestUsers = (page: number, count: number, filterUsers: FilterUsersType): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.loading());
    const data = await usersAPI.getUsers(page, count, filterUsers.term, filterUsers.friend);
    dispatch(actions.setCurrentPage(page));
    dispatch(actions.setTotalCount(data.totalCount));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.loading());
  };
};

export const follow = (userID: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.followingProgress(true, userID));
    const data = await usersAPI.followUser(userID);
    if (data.resultCode === 0) {
      dispatch(actions.followUnfollow(userID));
    }
    dispatch(actions.followingProgress(false, userID));
    dispatch(actions.changeFriends());
  };
};

export const unFollow = (userID: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.followingProgress(true, userID));
    const data = await usersAPI.unFollowUser(userID);
    if (data.resultCode === 0) {
      dispatch(actions.followUnfollow(userID));
    }
    dispatch(actions.followingProgress(false, userID));
    dispatch(actions.changeFriends());
  };
};

export default usersReducer;
