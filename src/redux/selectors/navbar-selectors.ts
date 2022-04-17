import {GlobalStateType} from "../redux-store";

export const getFriends = (state: GlobalStateType) => {
    return state.navbar.friends
}