import {GlobalStateType} from "../redux/redux-store";
import {ThunkAction} from "redux-thunk";
import {Action} from "redux";

export type DialogType = {
    id: number
    name: string
    image: string
}

export type MessageType = {
    id: number
    message: string
}

export type PostType = {
    id: number
    date: string
    likesCount: number
    text: string
}

export type ProfileContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type ProfilePhotosType = {
    small: string
    large: string
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ProfileContactsType
    photos: ProfilePhotosType
    aboutMe: string
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: ProfilePhotosType
    followed: boolean
    uniqueUrlName?: string | null
}

// Generic for ActionTypes
type ValuesType<T> = T extends {[key: string]: infer U} ? U : never
export type InferValuesType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<ValuesType<T>>

// Generic for ThunkType
export type BaseThunkType<A extends Action, R = void> = ThunkAction<R, GlobalStateType, unknown, A>

