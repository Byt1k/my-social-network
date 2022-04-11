import {followingAPI, ResultCodesEnum, usersAPI} from "../api/api"
import {InferValuesType, UserType} from "../types/types"
import {ThunkAction} from "redux-thunk";
import {GlobalStateType} from "./redux-store";
import {Dispatch} from "redux";

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
        case "users/TOGGLE_FOLLOW" :
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: !u.followed}
                    }
                    return u
                })
            }
        case "users/SET_USERS":
            return {
                ...state,
                users: action.users
            }
        case "users/SET_TOTAL_COUNT":
            return {
                ...state,
                totalCount: action.totalCount
            }
        case "users/CHANGE_PAGE":
            return {
                ...state,
                currentPage: action.pageNumber
            }
        case "users/TOGGLE_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "users/TOGGLE_FOLLOWING_IN_PROGRESS":
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

type ActionsTypes = ReturnType<InferValuesType<typeof actionsUsers>>
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>

export const actionsUsers = {
    toggleFollow: (userId: number) => ({type: 'users/TOGGLE_FOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'users/SET_USERS', users} as const),
    setTotalCount: (totalCount: number) => ({type: 'users/SET_TOTAL_COUNT', totalCount} as const),
    setCurrentPage: (pageNumber: number)  => ({type: 'users/CHANGE_PAGE', pageNumber} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'users/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingInProgress: (isFollowing: boolean, userId: number) => ({
        type: 'users/TOGGLE_FOLLOWING_IN_PROGRESS',
        isFollowing,
        userId
    } as const)
}

export const getUsers = (currentPage: number, pageSize: number): ThunkType => async dispatch => {
    dispatch(actionsUsers.toggleIsFetching(true))

    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(actionsUsers.setUsers(data.items));
    dispatch(actionsUsers.setTotalCount(data.totalCount));

    dispatch(actionsUsers.toggleIsFetching(false))
}

const followUnfollowFlow = async (apiRequest: any, userId: number, dispatch: Dispatch<ActionsTypes>) => {

    dispatch(actionsUsers.toggleFollowingInProgress(true, userId));

    let data = await apiRequest(userId)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionsUsers.toggleFollow(userId))
    }

    dispatch(actionsUsers.toggleFollowingInProgress(false, userId))
}

export const follow = (userId: number): ThunkType => async dispatch => {
    followUnfollowFlow(followingAPI.follow, userId, dispatch)
}

export const unfollow = (userId: number): ThunkType  => async dispatch => {
    followUnfollowFlow(followingAPI.unfollow, userId, dispatch)
}

export default usersReducer
