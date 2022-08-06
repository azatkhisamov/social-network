import axios from 'axios';
import { PhotosProfileType, ProfileType } from '../redux/profileReducer';
import { UsersType } from '../redux/usersReducer';

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "api-key": "81216470-5d6e-440a-b988-9e8ce11d3516",
    } 
})

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
} 

type GetUsersType = {
    items: Array<UsersType>
    totalCount: number
    error: null | string
}

type DataSavePhotoType = {
    photos: PhotosProfileType
}

type AuthResponseType = {
    id: number
    email: string 
    login: string
}

type LoginResponseType = {
    userId: number
}

type GetCaptchaUrlType = {
    url: string
}

export const usersAPI = {
    getUsers(page: number, count: number, term: string, friend: null | boolean) {
        return instance.get<GetUsersType>(`users?page=${page}&count=${count}&term=${term}` + (friend === null ? '' : `&friend=${friend}`)).then(response => response.data);
    },
    followUser(userID: number) {
        return instance.post<ResponseType>(`follow/${userID}`, {}).then(response => response.data);
    },
    unFollowUser(userID: number) {
        return instance.delete<ResponseType>(`follow/${userID}`).then(response => response.data);
    }
}

export const profileAPI = {
    setUserProfile(userID: number | null) {
        return instance.get<ProfileType>(`profile/${userID}`).then(response => response.data)
    },
    getUserStatus(userID: number) {
        return instance.get<string>(`profile/status/${userID}`).then(response => response.data);
    },
    updateUserStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status: status}).then(response => response.data);
    },
    savePhoto(imageFile: File) {
        let formdata = new FormData();
        formdata.append('image', imageFile);
        return instance.put<ResponseType<DataSavePhotoType>>("profile/photo", formdata, {
            headers: {"Content-Type": "multipart/form-data"}
        }).then(response => response.data);
    },
    updateProfileData(profile: ProfileType) {
        return instance.put<ResponseType>('profile', profile).then(response => response.data);
    },
}

export const authAPI = {
    auth() {
        return instance.get<ResponseType<AuthResponseType>>('auth/me').then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<ResponseType<LoginResponseType>>("auth/login", {email, password, rememberMe, captcha}).then(response => response.data)
    },
    logout() {
        return instance.delete<ResponseType>("auth/login").then(response => response.data)
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlType>("security").then(response => response.data);
    },
}