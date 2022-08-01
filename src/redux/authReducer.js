import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "auth/SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCES = "auth/GET-CAPTCHA-URL-SUCCES";

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCES:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;

export const setUserData = (id, login, email, isAuth) => ({
  type: SET_USER_DATA,
  payload: { id, login, email, isAuth },
});

const getCaptchaUrlSucces = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCES,
  payload: { captchaUrl },
});

export const getAuthUserData = () => async (dispatch) => {
  const data = await authAPI.auth();
  if (data.resultCode === 0) {
    let { id, login, email } = data.data;
    dispatch(setUserData(id, login, email, true));
  }
};

export const loginUser = (email, password, rememberMe, captcha) => async (dispatch) => {
  const data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else if (data.resultCode === 10) {
    dispatch(getCaptchaUrl());
  } 
  // else {
  //   dispatch(stopSubmit("login", { _error: data.messages[0] || "Some error" }));
  // }
};

export const logout = () => async (dispatch) => {
  const data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = () => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  dispatch(getCaptchaUrlSucces(data.url));
};
