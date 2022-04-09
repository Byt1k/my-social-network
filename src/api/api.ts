import axios, {Axios, AxiosResponse} from "axios";
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

type GetUsersResponse = {
    items: Array<UserType>
    totalCount: number
    error: string | null

}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersResponse>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    }
}

type TypicalResponse = {
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const followingAPI = {
    follow(userId: number) {
        return instance.post<TypicalResponse>(`follow/${userId}`).then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<TypicalResponse>(`follow/${userId}`).then(response => response.data)
    }
}

type GetMeResponse = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponse = {
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
    data: {
        id: number
    }
}

export const authAPI = {
    getMe() {
        return instance.get<GetMeResponse>('auth/me').then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instance.post<LoginResponse>('auth/login', {email, password, rememberMe, captcha}).then(res => res.data)
    },
    logout() {
        return instance.delete<TypicalResponse>('auth/login').then(res => res.data)
    }
}

type UploadMainPhotoResponse = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: ProfilePhotosType
}

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId).then(response => response.data)
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(response => response.data)
    },
    updateUserStatus(status: string) {
        return instance.put<TypicalResponse>('profile/status', {status: status}).then(res => res.data)
    },
    uploadMainPhoto(photos: any) {
        let formData = new FormData();
        formData.append('image', photos);
        return instance.put<UploadMainPhotoResponse>('profile/photo', formData).then(res => res.data);
    },
    updateProfileData(data: ProfileType) {
        return instance.put<TypicalResponse>('profile', data)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<{url: string}>('security/get-captcha-url').then(response => response.data.url)
    }
}