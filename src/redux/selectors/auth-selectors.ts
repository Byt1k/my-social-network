import {GlobalStateType} from "../redux-store";

export const getIsAuth = (state: GlobalStateType) => {
    return state.auth.isAuth
}

export const getLogin = (state: GlobalStateType) => {
    return state.auth.login
}

export const getCaptcha = (state: GlobalStateType) => {
    return state.auth.captchaUrl
}

