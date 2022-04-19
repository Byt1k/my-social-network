import {ResultCodesEnum} from "../api/api"
import {FormAction, stopSubmit} from "redux-form"
import {actionsApp} from "./app-reducer"
import {BaseThunkType, InferValuesType, PostType, ProfilePhotosType, ProfileType} from "../types/types"
import {profileAPI} from "../api/profile-api";
import {usersAPI} from "../api/users-api";

const initialState = {
    posts: [
        {
            id: 1,
            date: "25 sep 2021",
            likesCount: 13,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto optio illo pariatur molestiae sapiente similique, velit impedit dolorum quam ducimus libero explicabo voluptatum officiis. Ipsum esse in sunt autem ipsam!"
        },
        {id: 2, date: "23 sep 2021", likesCount: 7, text: "Hey, why nobody love me?"},
        {id: 3, date: "21 sep 2021", likesCount: 913, text: "This is my first post. Now I'm with you!"}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    userStatus: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "profile/ADD-POST": {
            let newPost = {
                id: action.newPostId,
                date: action.date,
                likesCount: 0,
                text: action.newPostBody
            }
            return {
                ...state,
                posts: [newPost, ...state.posts],
            }
        }
        case "profile/SET_USERS_PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "profile/SET_USER_STATUS":
            return {
                ...state,
                userStatus: action.status
            }
        case "profile/UPDATE_MAIN_PHOTO":
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        case "profile/SET_PROFILE_FOLLOWED":
            return {
                ...state,
                profile: {...state.profile, followed: action.followed} as ProfileType
            }
        default:
            return state
    }
}

type ActionsType = InferValuesType<typeof actionsProfile>
export type ThunkType = BaseThunkType<ActionsType | FormAction>

export const actionsProfile = {
    addPost: (newPostBody: string, date: string, newPostId: number) => ({type: 'profile/ADD-POST', newPostBody, date, newPostId} as const),
    setUserProfile: (profile: ProfileType | null) => ({type: 'profile/SET_USERS_PROFILE', profile} as const),
    setUserStatus: (status: string) => ({type: 'profile/SET_USER_STATUS', status} as const),
    savePhotoSuccess: (photos: ProfilePhotosType) => ({type: 'profile/UPDATE_MAIN_PHOTO', photos} as const),
    setProfileFollowed: (followed: boolean) => ({type: 'profile/SET_PROFILE_FOLLOWED', followed} as const)
}

export const getUserProfile = (userId: number): ThunkType => async dispatch => {
    dispatch(actionsApp.toggleIsFetching(true))
    dispatch(actionsProfile.setUserProfile(null))

    let profile = await profileAPI.getUserProfile(userId)
    let followed = await usersAPI.isFollowed(userId)
    dispatch(actionsProfile.setUserProfile(profile))
    dispatch(actionsProfile.setProfileFollowed(followed))

    dispatch(actionsApp.toggleIsFetching(false))
}

export const getUserStatus = (userId: number): ThunkType => async dispatch => {
    dispatch(actionsApp.toggleIsFetching(true))

    let data = await profileAPI.getUserStatus(userId)
    dispatch(actionsProfile.setUserStatus(data))

    dispatch(actionsApp.toggleIsFetching(false))
}

export const updateUserStatus = (status:string): ThunkType => async dispatch => {
    let data = await profileAPI.updateUserStatus(status)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionsProfile.setUserStatus(status))
    } else {
        dispatch(actionsApp.setErrorMessage(data.messages[0]))
    }
}

export const updateMainPhoto = (photos: File): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId as number
    let data = await profileAPI.uploadMainPhoto(photos)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionsProfile.savePhotoSuccess(data.data))
        dispatch(getUserProfile(userId))
    } else {
        dispatch(actionsApp.setErrorMessage(data.messages[0]))
    }
}

export const updateProfileData = (profileData: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId as number
    let data = await profileAPI.updateProfileData(profileData)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getUserProfile(userId))
    }
    else {
        // dispatch(stopSubmit('editProfile', {'contacts': {'facebook': response.data.messages[0]}}))
        // Распарсить строку, чтоб подсвечивать ошибочный инпут
        dispatch(stopSubmit('editProfile', {_error: data.messages[0]} ))
        return Promise.reject()
    }
}

export default profileReducer
