import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
const SET_ERROR_MESSAGE = 'profile/SET_ERROR_MESSAGE';

let initialState = {
    initialized: false,
    errorMessage: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        default: return state;
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});
export const setErrorMessage = errorMessage => ({type: SET_ERROR_MESSAGE, errorMessage})

export const initializeApp = () => dispatch => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    })
}

export default appReducer;
