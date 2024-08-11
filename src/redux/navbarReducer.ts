import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/api";
import { AppStateType, InferActionsTypes } from "./redux-store";
import { UsersType } from "./usersReducer";


let initialState = {
  friends: [] as Array<UsersType>,
  totalCountFriends: 0,
  isFetching: false,
};

type InitialStateType = typeof initialState;

let navbarReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case 'navbar/SET_FRIENDS':
      return {
        ...state,
        friends: [...action.friends],
      }
    case 'navbar/SET_TOTAL_COUNT_FRIENDS': 
      return {
        ...state, 
        ...action.payload,
      }
    case 'navbar/LOADING':
      return {
        ...state,
        isFetching: !state.isFetching,
      }
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  setFriends: (friends: Array<UsersType>) => ({
    type: 'navbar/SET_FRIENDS',
    friends: friends,
  } as const),
  setTotalCountFriends: (totalCountFriends: number) => ({
    type: 'navbar/SET_TOTAL_COUNT_FRIENDS',
    payload: {totalCountFriends}
  } as const),
  loading: () => ({
    type: 'navbar/LOADING',
  } as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const requestFriends = (): ThunkType => async dispatch => {
  dispatch(actions.loading());
  const data = await usersAPI.getUsers(1, 10, '', true);
  dispatch(actions.setTotalCountFriends(data.totalCount));
  dispatch(actions.setFriends(data.items));
  dispatch(actions.loading());
} 

export default navbarReducer;

