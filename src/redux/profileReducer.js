import { profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const ADD_NEW_POST = "profile/ADD-NEW-POST";
const SET_USER_PROFILE = "profile/SET-USER-PROFILE";
const SET_USER_STATUS = "profile/SET-USER-STATUS";
const SAVE_PHOTO_SUCCES = "profile/SAVE-PHOTO-SUCCES";

let initialState = {
  profile: [],
  postData: [
    {
      id: 1,
      message:
        "H&M объявила, что окончательно уходит из России. В рамках сворачивания бизнеса магазины на время откроют для распродаж.",
    },
    {
      id: 2,
      message: "Казанских школьников обучат основам бизнеса за 2,4 млн рублей",
    },
    {
      id: 3,
      message:
        'Канада отправила турбину Siemens для "Северного потока" в Германию в минувшее воскресенье, ее везут самолетом, а в России она должна быть к 24 июля // СМИ',
    },
    {
      id: 4,
      message:
        "ЕС исключил ювелирные украшения из запрета на импорт российского золота, сообщает издание Politico со ссылкой на проект документа Еврокомиссии.",
    },
    {
      id: 5,
      message:
        "Русский парень starter pack. Фамейе забивает пенальти и выводит Рубин вперед.",
    },
  ],
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_POST:
      let newPost = { id: state.postData.at(-1).id, message: action.post };
      return {
        ...state,
        postData: [...state.postData, newPost],
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case SAVE_PHOTO_SUCCES:
      return {
        ...state,
        profile: {...state.profile, photos: action.photos},
      }
    default:
      return state;
  }
};

export const addNewPost = (post) => ({ type: ADD_NEW_POST, post });
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile: profile,
});

const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  status: status,
});

const savePhotoSucces = (photos) => ({
  type: SAVE_PHOTO_SUCCES,
  photos,
})

export const getUserProfile = (id) => {
  return async (dispatch) => {
    const data = await profileAPI.setUserProfile(id);
    dispatch(setUserProfile(data));
  };
};

export const getUserStatus = (userID) => async (dispatch) => {
  const data = await profileAPI.getUserStatus(userID);
  dispatch(setUserStatus(data));
};

export const updateUserStatus = (status) => async (dispatch) => {
  const data = await profileAPI.updateUserStatus(status);
  if (data.resultCode === 0) {
    dispatch(setUserStatus(status));
  }
};

export const savePhoto = (imageFile) => async (dispatch) => {
  debugger
  const data = await profileAPI.savePhoto(imageFile);
  if (data.resultCode === 0) {
    dispatch(savePhotoSucces(data.data.photos));
  }
}

export const updateProfileData = (profile) => async (dispatch, getState) => {
  const authID = getState().auth.id;
  const data = await profileAPI.updateProfileData(profile);
  if (data.resultCode === 0) {
    dispatch(getUserProfile(authID));
  }
  else {
    dispatch(stopSubmit("update-profile", { _error: data.messages[0] || "Some error" }));
    return Promise.reject();
  }
}

export default profileReducer;
