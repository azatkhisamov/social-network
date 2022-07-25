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
    }
}

export const authAPI = {
    auth() {
        return instance.get('auth/me').then(response => response.data)
    }
}