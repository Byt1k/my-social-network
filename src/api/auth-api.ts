import {instance, ResultCodeForCaptcha, ServerResponseType} from "./api";

export const authApi = {
    getMe() {
        return instance.get<ServerResponseType<MeDataType>>('auth/me').then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null) {
        return instance.post<ServerResponseType<LoginResponseDataType, ResultCodeForCaptcha>>('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    logout() {
        return instance.delete<ServerResponseType>('auth/login').then(res => res.data)
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