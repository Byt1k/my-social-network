import {GlobalStateType} from "../redux-store";

export const getInitialized = (state: GlobalStateType) => {
    return state.app.initialized
}

export const getErrorMessage = (state: GlobalStateType) => {
    return state.app.errorMessage
}

