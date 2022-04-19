import {getAuthUserData} from "./auth-reducer"
import {BaseThunkType, InferValuesType} from "../types/types";

const initialState = {
    isFetching: false,
    initialized: false,
    errorMessage: null as string | null
}

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
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
        case "app/TOGGLE_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}

type ActionsType = InferValuesType<typeof actionsApp>
export type ThunkType = BaseThunkType<ActionsType>

export const actionsApp = {
    toggleIsFetching: (isFetching: boolean) => ({type: 'app/TOGGLE_IS_FETCHING', isFetching} as const),
    initializedSuccess: () => ({type: 'app/INITIALIZED_SUCCESS'} as const),
    setErrorMessage: (errorMessage: string | null) => ({type: 'app/SET_ERROR_MESSAGE', errorMessage} as const)
}


export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
        dispatch(actionsApp.initializedSuccess())
    })
}

export default appReducer;
