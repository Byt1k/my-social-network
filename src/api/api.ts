import axios from "axios";

export const instance = axios.create({
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

export type GetItemsResponse<T = {}> = {
    items: Array<T>
    totalCount: number
    error: string | null
}

export type ServerResponseType<T = {}, C = number> = {
    resultCode: ResultCodesEnum | C
    messages: Array<string>
    data: T
}

