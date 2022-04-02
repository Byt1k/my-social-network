import {getAuthUserData} from "./auth-reducer"

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'
const SET_ERROR_MESSAGE = 'app/SET_ERROR_MESSAGE'

const initialState = {
    initialized: false,
    errorMessage: null as string | null
}

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action):InitialStateType => {
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
type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = ():InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS});

type SetErrorMessageActionType = {
    type: typeof SET_ERROR_MESSAGE
    errorMessage: string
}
export const setErrorMessage = (errorMessage: string):SetErrorMessageActionType => ({type: SET_ERROR_MESSAGE, errorMessage})

export const initializeApp = () => dispatch => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    })
}

export default appReducer;
