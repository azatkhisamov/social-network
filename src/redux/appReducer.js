import { getAuthUserData } from "./authReducer";

const INITIALIZATION = "app/INITIALIZATION";

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZATION:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const initialization = () => ({
  type: INITIALIZATION,
});

export const initialize = () => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  promise.then(() => {
    dispatch(initialization());
  });
};

export default appReducer;
