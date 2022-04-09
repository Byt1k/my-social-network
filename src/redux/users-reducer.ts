import {followingAPI, ResultCodesEnum, usersAPI} from "../api/api"
import {UserType} from "../types/types"
import {ThunkAction} from "redux-thunk";
import {GlobalStateType} from "./redux-store";
import {Dispatch} from "redux";

const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW'
const SET_USERS = 'SET_USERS'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const SET_CURRENT_PAGE = 'CHANGE_PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS'

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case TOGGLE_FOLLOW :
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: !u.followed}
                    }
                    return u
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.totalCount
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.pageNumber
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFollowing
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state
    }
}

type ActionsTypes = ToggleFollowActionType | SetUsersActionType| SetTotalCountActionType | SetCurrentPageActionType |
    ToggleIsFetchingActionType | ToggleFollowingInProgressActionType
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>

type ToggleFollowActionType = {
    type: typeof TOGGLE_FOLLOW
    userId: number
}
export const toggleFollow = (userId: number): ToggleFollowActionType => ({type: TOGGLE_FOLLOW, userId})

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users})

type SetTotalCountActionType = {
    type: typeof SET_TOTAL_COUNT
    totalCount: number
}
export const setTotalCount = (totalCount: number): SetTotalCountActionType => ({type: SET_TOTAL_COUNT, totalCount})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    pageNumber: number
}
export const setCurrentPage = (pageNumber: number) : SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, pageNumber})

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching})

type ToggleFollowingInProgressActionType = {
    type: typeof TOGGLE_FOLLOWING_IN_PROGRESS
    isFollowing: boolean
    userId: number
}
export const toggleFollowingInProgress = (isFollowing: boolean, userId: number): ToggleFollowingInProgressActionType => ({
    type: TOGGLE_FOLLOWING_IN_PROGRESS,
    isFollowing,
    userId
})

export const getUsers = (currentPage: number, pageSize: number): ThunkType => async dispatch => {
    dispatch(toggleIsFetching(true))

    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setTotalCount(data.totalCount));

    dispatch(toggleIsFetching(false))
}

const followUnfollowFlow = async (apiRequest: any, userId: number, dispatch: Dispatch<ActionsTypes>) => {

    dispatch(toggleFollowingInProgress(true, userId));

    let data = await apiRequest(userId)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(toggleFollow(userId))
    }

    dispatch(toggleFollowingInProgress(false, userId))
}

export const follow = (userId: number): ThunkType => async dispatch => {
    followUnfollowFlow(followingAPI.follow, userId, dispatch)
}

export const unfollow = (userId: number): ThunkType  => async dispatch => {
    followUnfollowFlow(followingAPI.unfollow, userId, dispatch)
}

export default usersReducer
