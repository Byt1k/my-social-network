import {authAPI, ResultCodeForCaptcha, ResultCodesEnum, securityAPI} from "../api/api"
import {stopSubmit} from "redux-form"
import {ThunkAction} from "redux-thunk";
import {GlobalStateType} from "./redux-store";

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA'
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL'

const initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes):InitialStateType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
        case SET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

type ActionsTypes = SetAuthUserDataActionType | SetCaptchaUrlActionType
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>

type SetAuthUserDataPayloadType = {
    userId: number
    login: string
    email: string
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_AUTH_USER_DATA
    payload: SetAuthUserDataPayloadType
}
export const setAuthUserData = (userId: number, login: string, email: string, isAuth: boolean):SetAuthUserDataActionType => ({
    type: SET_AUTH_USER_DATA,
    payload: {userId, login, email, isAuth}
})

type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL
    payload: {captchaUrl: string}
}
const setCaptchaUrl = (captchaUrl: string):SetCaptchaUrlActionType => ({
    type: SET_CAPTCHA_URL,
    payload: {captchaUrl}
})

export const getAuthUserData = (): ThunkType => async dispatch => {
    const data = await authAPI.getMe()
    if (data.resultCode === 0) {
        let {id, login, email} = data.data
        dispatch(setAuthUserData(id, login, email, true))
    }
}

// Типизировать
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async dispatch => {
    const data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
        dispatch(setCaptchaUrl(null))
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
        dispatch(setAuthUserData(null, null, null, false));
    }
}

const getCaptchaUrl = (): ThunkType => async dispatch => {
    const captchaUrl = await securityAPI.getCaptchaUrl()
    dispatch(setCaptchaUrl(captchaUrl))
}

export default authReducer
