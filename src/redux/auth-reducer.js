import {authAPI} from "../api/api";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const SET_USER_ID = 'SET_USER_ID';

let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        case SET_USER_ID:
            return {
                ...state,
                userId: action.userId
            }
        default: return state;
    }
}

export const setAuthUserData = (userId, login, email) => ({type: SET_AUTH_USER_DATA, data: {userId, login, email}});
export const setUserId = (userId) => ({type: SET_USER_ID, userId})

export const getAuthUserData = () => dispatch => {
    authAPI.getMe().then(data => {
        if (data.resultCode === 0) {
            let {id, login, email} = data.data;
            dispatch(setAuthUserData(id, login, email));
        }
    })
}

export const login = (email, password, rememberMe, captcha = true) => dispatch => {
    authAPI.login(email, password, rememberMe, captcha).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setUserId(response.data.userId));
        }
    })
}



export default authReducer;
