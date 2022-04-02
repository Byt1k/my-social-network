import {profileAPI} from "../api/api"
import {stopSubmit} from "redux-form"
import {setErrorMessage} from "./app-reducer"
import {PostType, ProfilePhotosType, ProfileType} from "../types/types"

const ADD_POST = 'profile/ADD-POST'
const SET_USER_PROFILE = 'profile/SET_USERS_PROFILE'
const SET_USER_STATUS = 'profile/SET_USER_STATUS'
const TOGGLE_IS_FETCHING = 'profile/TOGGLE_IS_FETCHING'
const UPDATE_MAIN_PHOTO = 'profile/UPDATE_MAIN_PHOTO'

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
    userStatus: '',
    isFetching: false
}

type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
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
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_USER_STATUS:
            return {
                ...state,
                userStatus: action.status
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case UPDATE_MAIN_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state
    }
}

type AddPostActionType = {
    type: typeof ADD_POST
    newPostBody: string
    date: string
    newPostId: number
}
export const addPost = (newPostBody: string, date: string, newPostId: number): AddPostActionType => ({type: ADD_POST, newPostBody, date, newPostId})

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})

type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS
    status: string
}
const setUserStatus = (status: string): SetUserStatusActionType => ({type: SET_USER_STATUS, status})

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching})

type SavePhotoSuccessActionType = {
    type: typeof UPDATE_MAIN_PHOTO
    photos: ProfilePhotosType
}
const savePhotoSuccess = (photos: ProfilePhotosType): SavePhotoSuccessActionType => ({type: UPDATE_MAIN_PHOTO, photos})

export const getUserProfile = (userId: number) => async dispatch => {
    dispatch(toggleIsFetching(true))

    let data = await profileAPI.getUserProfile(userId)
    dispatch(setUserProfile(data))

    dispatch(toggleIsFetching(false))
}

export const getUserStatus = (userId: number) => async dispatch => {
    dispatch(toggleIsFetching(true))

    let data = await profileAPI.getUserStatus(userId)
    dispatch(setUserStatus(data))

    dispatch(toggleIsFetching(false))
}

export const updateUserStatus = (status:string) => async dispatch => {
    let response = await profileAPI.updateUserStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status))
    } else {
        dispatch(setErrorMessage(response.data.messages[0]))
    }
}

export const updateMainPhoto = (photos: ProfilePhotosType) => async dispatch => {
    let response = await profileAPI.uploadMainPhoto(photos)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    } else {
        dispatch(setErrorMessage(response.data.messages[0]))
    }
}

export const updateProfileData = (data: ProfileType) => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let response = await profileAPI.updateProfileData(data)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    }
    else {
        // dispatch(stopSubmit('editProfile', {'contacts': {'facebook': response.data.messages[0]}}))
        // Распарсить строку, чтоб подсвечивать ошибочный инпут
        dispatch(stopSubmit('editProfile', {_error: response.data.messages[0]} ))
        return Promise.reject()
    }
}

export default profileReducer
