import { usersAPI } from "../api/api";

const FOLLOW_UNFOLLOW = "FOLLOW-UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_COUNT = "SET-TOTAL-COUNT";
const LOADING = "LOADING";
const FOLLOWING_PROGRESS = "FOLLOWING-PROGRESS";

let initialState = {
  users: [],
  countUsers: 10,
  totalCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

let usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW_UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userID) {
            return { ...user, followed: !user.followed };
          }
          return user;
        }),
      };
    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.numberPage,
      };
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.totalCount,
      };
    case LOADING:
      return {
        ...state,
        isFetching: !state.isFetching,
      };
    case FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userID]
          : state.followingInProgress.filter((id) => id !== action.userID),
      };
    default:
      return state;
  }
};

export const followUnfollow = (userID) => ({
  type: FOLLOW_UNFOLLOW,
  userID: userID,
});

export const setUsers = (users) => ({
  type: SET_USERS,
  users: users,
});

export const setCurrentPage = (numberPage) => ({
  type: SET_CURRENT_PAGE,
  numberPage: numberPage,
});

export const setTotalCount = (totalCount) => ({
  type: SET_TOTAL_COUNT,
  totalCount: totalCount,
});

export const loading = () => ({
  type: LOADING,
});

export const followingProgress = (isFetching, userID) => ({
  type: FOLLOWING_PROGRESS,
  isFetching,
  userID,
});

export const getUsers = (page, count) => {
  return (dispatch) => {
    dispatch(loading());
    usersAPI.getUsers(page, count).then((data) => {
      dispatch(setCurrentPage(page));
      dispatch(setTotalCount(data.totalCount));
      dispatch(setUsers(data.items));
      dispatch(loading());
    });
  };
};

export const follow = (userID) => {
  return (dispatch) => {
    dispatch(followingProgress(true, userID));
    usersAPI.followUser(userID).then(data => {
      if (data.resultCode === 0) {
        dispatch(followUnfollow(userID));
      }
      dispatch(followingProgress(false, userID));
    })
  }
}

export const unFollow = (userID) => {
  return (dispatch) => {
    dispatch(followingProgress(true, userID));
    usersAPI.unFollowUser(userID).then(data => {
      if (data.resultCode === 0) {
        dispatch(followUnfollow(userID));
      }
      dispatch(followingProgress(false, userID));
    })
  }
}

export default usersReducer;
