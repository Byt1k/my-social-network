import * as axios from "axios";

let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '4a54e3ab-3cd8-4fae-8c3f-c7c395a35c63'
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    }
}

export const followingAPI = {
    follow(userId) {
        return instance.post(`follow/${userId}`).then(response => response.data)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`).then(response => response.data)
    }
}

export const authAPI = {
    getMe() {
        return instance.get('auth/me').then(response => response.data)
    },
    login(email, password, rememberMe, captcha) {
        return instance.post('auth/login', {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete('auth/login')
    }
}

export const profileAPI = {
    getUserProfile(userId) {
        return instance.get(`profile/` + userId).then(response => response.data)
    },
    getUserStatus(userId) {
        return instance.get(`profile/status/` + userId).then(response => response.data)
    },
    updateUserStatus(status) {
        return instance.put('profile/status', {status: status})
    },
    uploadMainPhoto(photos) {
        let formData = new FormData();
        formData.append('image', photos);
        return instance.put('profile/photo', formData);
    },
    updateProfileData(data) {
        return instance.put('profile', data)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url').then(response => response.data.url)
    }
}