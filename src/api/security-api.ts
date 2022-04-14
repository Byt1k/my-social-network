import {instance} from "./api";

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<{ url: string }>('security/get-captcha-url').then(res => res.data.url)
    }
}