import {GlobalStateType} from "../redux-store";

export const getProfilePageData = (state: GlobalStateType) => {
    return state.profilePage
}