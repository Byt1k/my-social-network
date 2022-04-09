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
}

export type FriendType = {
    id: number
    image: string
    firstName: string
}