import {authAPI, ResultCodeForCaptcha, ResultCodesEnum, securityAPI} from "../api/api"
import {FormAction, stopSubmit} from "redux-form"
import {BaseThunkType, InferValuesType} from "../types/types";
import {getFriendsToNavbar} from "./navbar-reducer";

const initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case "auth/SET_AUTH_USER_DATA":
        case "auth/SET_CAPTCHA_URL":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

type ActionsType = InferValuesType<typeof actionsAuth>
export type ThunkType = BaseThunkType<ActionsType | FormAction>

export const actionsAuth = {
    setAuthUserData: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
        type: 'auth/SET_AUTH_USER_DATA',
        payload: {userId, login, email, isAuth}
    } as const),
    setCaptchaUrl: (captchaUrl: string | null) => ({
        type: 'auth/SET_CAPTCHA_URL',
        payload: {captchaUrl}
    } as const)
}

export const getAuthUserData = (): ThunkType => async dispatch => {
    const data = await authAPI.getMe()
    if (data.resultCode === 0) {
        let {id, login, email} = data.data
        dispatch(actionsAuth.setAuthUserData(id, login, email, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => async dispatch => {
    const data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
        dispatch(getFriendsToNavbar())
        dispatch(actionsAuth.setCaptchaUrl(null))
    } else {
        dispatch(stopSubmit('login', {_error: data.messages[0]}))
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
    }
}

export const logout = (): ThunkType => async dispatch => {
    const data = await authAPI.logout()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionsAuth.setAuthUserData(null, null, null, false))
    }
}

const getCaptchaUrl = (): ThunkType => async dispatch => {
    const captchaUrl = await securityAPI.getCaptchaUrl()
    dispatch(actionsAuth.setCaptchaUrl(captchaUrl))
}

export default authReducer
