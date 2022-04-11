import {getAuthUserData} from "./auth-reducer"
import {ThunkAction} from "redux-thunk";
import {GlobalStateType} from "./redux-store";
import {InferValuesType} from "../types/types";

const initialState = {
    initialized: false,
    errorMessage: null as string | null
}

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "app/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            }
        case "app/SET_ERROR_MESSAGE":
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        default:
            return state;
    }
}

type ActionsTypes = ReturnType<InferValuesType<typeof actionsApp>>

export type ThunkType = ThunkAction<void, GlobalStateType, unknown, ActionsTypes>

export const actionsApp = {
    initializedSuccess: () => ({type: 'app/INITIALIZED_SUCCESS'} as const),
    setErrorMessage: (errorMessage: string) => ({type: 'app/SET_ERROR_MESSAGE', errorMessage} as const)
}


export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(actionsApp.initializedSuccess());
    })
}

export default appReducer;
