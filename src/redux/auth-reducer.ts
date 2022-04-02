import {authAPI, securityAPI} from "../api/api"
import {stopSubmit} from "redux-form"

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

const authReducer = (state = initialState, action):InitialStateType => {
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

export const getAuthUserData = () => async dispatch => {
    const data = await authAPI.getMe()
    if (data.resultCode === 0) {
        let {id, login, email} = data.data
        dispatch(setAuthUserData(id, login, email, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async dispatch => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
        dispatch(setCaptchaUrl(null))
    } else {
        dispatch(stopSubmit('login', {_error: response.data.messages[0]}))
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
    }
}

export const logout = () => async dispatch => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

const getCaptchaUrl = () => async dispatch => {
    const captchaUrl = await securityAPI.getCaptchaUrl()
    dispatch(setCaptchaUrl(captchaUrl))
}

export default authReducer
