import { profileAPI } from "../api/api";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./redux-store";
import React from "react";

export type ContactsProfileType = {
  github: string | null
  vk: string | null
  facebook: string | null
  instagram: string | null
  twitter: string | null
  website: string | null
  youtube: string | null
  mainLink: string | null
}
export type PhotosProfileType = {
  small: string | null
  large: string | null
}
export type ProfileType = {
  userId: number
  lookingForAJob: boolean | null
  lookingForAJobDescription: string | null
  fullName: string
  contacts: ContactsProfileType
  photos: PhotosProfileType
  aboutMe: string | null
}

export type PostDataType = {
  id: number
  message: string
}

let initialState = {
  profile: null as ProfileType | null,
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
  ] as Array<PostDataType>,
  status: "",
};

type InitialStateType = typeof initialState;


const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'profile/ADD_NEW_POST':
      let newPost = { id: (state.postData.length + 1), message: action.post };
      return {
        ...state,
        postData: [...state.postData, newPost],
      };
    case 'profile/SET_USER_PROFILE':
      return {
        ...state,
        profile: action.profile,
      };
    case 'profile/SET_USER_STATUS':
      return {
        ...state,
        status: action.status,
      };
    case 'profile/SAVE_PHOTO_SUCCES':
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      }
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  addNewPost: (post: string) => ({ type: 'profile/ADD_NEW_POST', post } as const),
  setUserProfile: (profile: ProfileType) => ({
    type: 'profile/SET_USER_PROFILE',
    profile: profile,
  } as const),
  setUserStatus: (status: string) => ({
    type: 'profile/SET_USER_STATUS',
    status: status,
  } as const),
  savePhotoSucces: (photos: PhotosProfileType) => ({
    type: 'profile/SAVE_PHOTO_SUCCES',
    photos: photos,
  } as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const getUserProfile = (id: number): ThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.setUserProfile(id);
    dispatch(actions.setUserProfile(data));
  };
};

export const getUserStatus = (userID: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getUserStatus(userID);
  dispatch(actions.setUserStatus(data));
};

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
  const data = await profileAPI.updateUserStatus(status);
  if (data.resultCode === 0) {
    dispatch(actions.setUserStatus(status));
  }
};

export const savePhoto = (imageFile: any): ThunkType => async (dispatch) => {
  debugger
  const data = await profileAPI.savePhoto(imageFile);
  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSucces(data.data.photos));
  }
}

export const updateProfileData = (profile: ProfileType, setStatus: React.Dispatch<React.SetStateAction<null | string>>): ThunkType => async (dispatch, getState) => {
  const authID = getState().auth.id;
  const data = await profileAPI.updateProfileData(profile);
  if (data.resultCode === 0) {
    if (authID !== null) {
      dispatch(getUserProfile(authID));
    }
    else {
      throw new Error("user's id can't be null")
    }
  }
  else {
    setStatus(data.messages[0]);
  }
}

export default profileReducer;
