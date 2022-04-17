import {GlobalStateType} from "../redux-store";

export const getInitialized = (state: GlobalStateType) => {
    return state.app.initialized
}

