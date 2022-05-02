import {GlobalStateType} from "../redux/redux-store";
import {ThunkAction} from "redux-thunk";
import {Action} from "redux";

export type DialogType = {
    id: number
    name: string
    image: string
}

export type PostType = {
    id: number
    date: string
    likesCount: number
    text: string
}

export type ProfileContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}

export type ProfilePhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription?: string
    contacts: ProfileContactsType
    photos: ProfilePhotosType
    aboutMe: string | null
    followed?: boolean
}

export type UserType = {
    id: number
    name: string
    status?: string
    photos: ProfilePhotosType
    followed?: boolean
    uniqueUrlName?: string | null
}

// Generic for ActionTypes
type ValuesType<T> = T extends {[key: string]: infer U} ? U : never
export type InferValuesType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<ValuesType<T>>

// Generic for ThunkType
export type BaseThunkType<A extends Action, R = void> = ThunkAction<R, GlobalStateType, unknown, A>

