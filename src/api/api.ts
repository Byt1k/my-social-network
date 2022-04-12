import axios from "axios";
import {ProfilePhotosType, ProfileType, UserType} from "../types/types";

let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '4a54e3ab-3cd8-4fae-8c3f-c7c395a35c63'
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export type GetItemsres<T> = {
    items: Array<T>
    totalCount: number
    error: string | null
}

export type ServerResponseType<T = {}, C = number> = {
    resultCode: ResultCodesEnum | C
    messages: Array<string>
    data: T
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItemsres<UserType>>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    }
}

export const followingAPI = {
    follow(userId: number) {
        return instance.post<ServerResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete<ServerResponseType>(`follow/${userId}`).then(res => res.data)
    }
}

type MeDataType = {
    id: number
    email: string
    login: string
}

type LoginResponseDataType = {
    id: number
}

export const authAPI = {
    getMe() {
        return instance.get<ServerResponseType<MeDataType>>('auth/me').then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instance.post<ServerResponseType<LoginResponseDataType, ResultCodeForCaptcha>>('auth/login', {email, password, rememberMe, captcha}).then(res => res.data)
    },
    logout() {
        return instance.delete<ServerResponseType>('auth/login').then(res => res.data)
    }
}

export const profileAPI = {
    getUserProfile(userId: number | null) {
        return instance.get<ProfileType>(`profile/` + userId).then(res => res.data)
    },
    getUserStatus(userId: number | null) {
        return instance.get<string>(`profile/status/` + userId).then(res => res.data)
    },
    updateUserStatus(status: string) {
        return instance.put<ServerResponseType>('profile/status', {status: status}).then(res => res.data)
    },
    uploadMainPhoto(photos: File) {
        let formData = new FormData();
        formData.append('image', photos);
        return instance.put<ServerResponseType<ProfilePhotosType>>('profile/photo', formData).then(res => res.data);
    },
    updateProfileData(data: ProfileType) {
        return instance.put<ServerResponseType>('profile', data).then(res => res.data)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<{url: string}>('security/get-captcha-url').then(res => res.data.url)
    }
}