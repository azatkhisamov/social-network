import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./authReducer";
import { AppStateType, InferActionsTypes } from "./redux-store";

let initialState = {
  initialized: false,
};

type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case "app/INITIALIZATION":
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  initialization: () => ({
    type: "app/INITIALIZATION",
  } as const),
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>
export const initialize = (): ThunkType => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  promise.then(() => {
    dispatch(actions.initialization());
  });
};

export default appReducer;
