// import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { authAPI, securityAPI } from "../api/api";
import { AppStateType, InferActionsTypes } from "./redux-store";

let initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
  error: null as null | string
};

type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'auth/SET_USER_DATA':
    case 'auth/GET_CAPTCHA_URL_SUCCES':
      return {
        ...state,
        ...action.payload,
      };
    case 'auth/SET_ERROR':
      return {
        ...state, 
        ...action.payload,
      }
    default:
      return state;
  }
};

export default authReducer;

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  setUserData: (id: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
    type: 'auth/SET_USER_DATA',
    payload: { id, login, email, isAuth },
  } as const),
  getCaptchaUrlSucces: (captchaUrl: string | null) => ({
    type: 'auth/GET_CAPTCHA_URL_SUCCES',
    payload: { captchaUrl },
  } as const),
  setError: (error: string) => ({
    type: 'auth/SET_ERROR',
    payload: { error },
  } as const)
}

type ThunkType = ThunkAction<Promise<void> | Promise<string>, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const data = await authAPI.auth();
  if (data.resultCode === 0) {
    let { id, login, email } = data.data;
    dispatch(actions.setUserData(id, login, email, true));
  }
};

export const loginUser = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => async (dispatch) => {
  const data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else if (data.resultCode === 10) {
    dispatch(getCaptchaUrl());
  } 
  else {
    dispatch(actions.setError(data.messages[0]));
  }
};

export const logout = (): ThunkType => async (dispatch) => {
  const data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(actions.setUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  dispatch(actions.getCaptchaUrlSucces(data.url));
};
