import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA'
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL'

let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
        case SET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, login, email, isAuth) => ({
    type: SET_AUTH_USER_DATA,
    payload: {userId, login, email, isAuth}
});

const setCaptchaUrl = (captchaUrl) => ({
    type: SET_AUTH_USER_DATA,
    payload: {captchaUrl}
});

export const getAuthUserData = () => async dispatch => {
    const data = await authAPI.getMe();
    if (data.resultCode === 0) {
        let {id, login, email} = data.data;
        dispatch(setAuthUserData(id, login, email, true));
    }
}

export const login = (email, password, rememberMe, captcha) => async dispatch => {
    const response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
        dispatch(setCaptchaUrl(null));
    } else {
        dispatch(stopSubmit('login', {_error: response.data.messages[0]}))
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
    }
}

export const logout = () => async dispatch => {
    const response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}


const getCaptchaUrl = () => async dispatch => {
    const captchaUrl = await securityAPI.getCaptchaUrl();
    dispatch(setCaptchaUrl(captchaUrl))
}

export default authReducer;
