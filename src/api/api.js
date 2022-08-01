import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "api-key": "81216470-5d6e-440a-b988-9e8ce11d3516",
    } 
})

export const usersAPI = {
    getUsers(page, count) {
        return instance.get(`users?page=${page}&count=${count}`).then(response => response.data);
    },
    followUser(userID) {
        return instance.post(`follow/${userID}`, {}).then(response => response.data);
    },
    unFollowUser(userID) {
        return instance.delete(`follow/${userID}`).then(response => response.data);
    }
}

export const profileAPI = {
    setUserProfile(userID) {
        return instance.get(`profile/${userID}`).then(response => response.data)
    },
    getUserStatus(userID) {
        return instance.get(`profile/status/${userID}`).then(response => response.data);
    },
    updateUserStatus(status) {
        return instance.put(`profile/status`, {status: status}).then(response => response.data);
    },
    savePhoto(imageFile) {
        let formdata = new FormData();
        formdata.append('image', imageFile);
        return instance.put("profile/photo", formdata, {
            headers: {"Content-Type": "multipart/form-data"}
        }).then(response => response.data);
    },
    updateProfileData(profile) {
        return instance.put('profile', profile).then(response => response.data);
    },
}

export const authAPI = {
    auth() {
        return instance.get('auth/me').then(response => response.data)
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post("auth/login", {email, password, rememberMe, captcha}).then(response => response.data)
    },
    logout() {
        return instance.delete("auth/login").then(response => response.data)
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get("security").then(response => response.data);
    },
}