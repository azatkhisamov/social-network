const FOLLOW_UNFOLLOW = "FOLLOW-UNFOLLOW";
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT';
const LOADING = 'LOADING';

let initialState = {
  users: [],
  countUsers: 5,
  totalCount: 0,
  currentPage: 1,
  isFetching: false,
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
        }
      case SET_CURRENT_PAGE:
        return {
          ...state, 
          currentPage: action.numberPage,
        }
      case SET_TOTAL_COUNT:
        return {
          ...state, 
          totalCount: action.totalCount, 
        }
      case LOADING:
        return {
          ...state, 
          isFetching: !state.isFetching,
        }
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
})

export const setCurrentPage = (numberPage) => ({
  type: SET_CURRENT_PAGE, 
  numberPage: numberPage,
})

export const setTotalCount = (totalCount) => ({
  type: SET_TOTAL_COUNT,
  totalCount: totalCount,
})

export const loading = () => ({
  type: LOADING,
})


export default usersReducer;
