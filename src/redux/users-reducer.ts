import {ResultCodesEnum, ServerResponseType} from "../api/api"
import {BaseThunkType, InferValuesType, UserType} from "../types/types"
import {Action, Dispatch} from "redux";
import {usersAPI} from "../api/users-api";
import {actionsProfile} from "./profile-reducer";
import {actionsApp} from "./app-reducer";

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    followingInProgress: [] as Array<number>,
    term: ''
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
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
        case "users/SET_USERS_FILTER":
            return {
                ...state,
                term: action.term
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

type ActionsType = InferValuesType<typeof actionsUsers>
type ThunkType = BaseThunkType<ActionsType | Action>

export const actionsUsers = {
    toggleFollow: (userId: number) => ({type: 'users/TOGGLE_FOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'users/SET_USERS', users} as const),
    setTotalCount: (totalCount: number) => ({type: 'users/SET_TOTAL_COUNT', totalCount} as const),
    setCurrentPage: (pageNumber: number)  => ({type: 'users/CHANGE_PAGE', pageNumber} as const),
    setUsersFilter: (term: string)  => ({type: 'users/SET_USERS_FILTER', term} as const),
    toggleFollowingInProgress: (isFollowing: boolean, userId: number) => ({
        type: 'users/TOGGLE_FOLLOWING_IN_PROGRESS',
        isFollowing,
        userId
    } as const)
}

export const getUsers = (currentPage: number,
                         pageSize: number, term: string,
                         isFriend: boolean | undefined = undefined): ThunkType => async (dispatch) => {
    dispatch(actionsApp.toggleIsFetching(true))

    let data = await usersAPI.getUsers(currentPage, pageSize, term, isFriend);
    dispatch(actionsUsers.setUsers(data.items))
    dispatch(actionsUsers.setTotalCount(data.totalCount))
    dispatch(actionsUsers.setUsersFilter(term))

    dispatch(actionsApp.toggleIsFetching(false))
}

const _followUnfollowFlow = async (apiRequest: (userId: number) => Promise<ServerResponseType>,
                                   userId: number, dispatch: Dispatch<Action>) => {
    dispatch(actionsUsers.toggleFollowingInProgress(true, userId));

    let data = await apiRequest(userId)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionsUsers.toggleFollow(userId))

        let followed = await usersAPI.isFollowed(userId)
        dispatch(actionsProfile.setProfileFollowed(followed))
    }

    dispatch(actionsUsers.toggleFollowingInProgress(false, userId))
}

export const follow = (userId: number): ThunkType => async dispatch => {
    await _followUnfollowFlow(usersAPI.follow, userId, dispatch)
}

export const unfollow = (userId: number): ThunkType  => async dispatch => {
    await _followUnfollowFlow(usersAPI.unfollow, userId, dispatch)
}

export default usersReducer
