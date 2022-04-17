import {GlobalStateType} from "../redux-store";

export const getDialogsPageData = (state: GlobalStateType) => {
    return state.dialogsPage
}
