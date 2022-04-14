import {BaseThunkType, InferValuesType, UserType} from "../types/types";
import {usersAPI} from "../api/users-api";

const initialState = {
    friends: [] as UserType[]
}

type InitialStateType = typeof initialState

const navbarReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "navbar/SET_FRIENDS":
            return {
                ...state,
                friends: action.friends
            }
        default:
            return state
    }
}

export const actionsNavbar = {
    setFriends: (friends: UserType[]) => ({type: 'navbar/SET_FRIENDS', friends} as const)
}

type ActionsType = InferValuesType<typeof actionsNavbar>
export type ThunkType = BaseThunkType<ActionsType>

export const getFriendsToNavbar = (): ThunkType => async (dispatch) => {
    const data = await usersAPI.getUsers(1, 3, '', true)
    dispatch(actionsNavbar.setFriends(data.items))
}

export default navbarReducer
