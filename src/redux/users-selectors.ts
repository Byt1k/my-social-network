import {createSelector} from "reselect";
import {GlobalStateType} from "./redux-store";

const getUsersSelector = (state: GlobalStateType) => {
    return state.usersPage.users
}

// Пример использлования reselect
export const getUsers = createSelector(getUsersSelector, users => {
    return users.filter(u => u);
})
//

export const getPageSize = (state: GlobalStateType) => {
    return state.usersPage.pageSize
}

export const getTotalCount = (state: GlobalStateType) => {
    return state.usersPage.totalCount
}

export const getCurrentPage = (state: GlobalStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: GlobalStateType) => {
    return state.usersPage.isFetching
}

export const getToggleFollowingInProgress = (state: GlobalStateType) => {
    return state.usersPage.followingInProgress
}