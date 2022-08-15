import { AppStateType } from './redux-store';

export const getPosts = (state: AppStateType) => {
    return state.profilePage.postData;
}

export const getAvatar = (state: AppStateType) => {
    return state.profilePage.profile?.photos.large;
}