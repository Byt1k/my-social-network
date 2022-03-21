import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USERS_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    posts: [
        {
            id: 1,
            date: "25 sep 2021",
            likesCount: 13,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto optio illo pariatur molestiae sapiente similique, velit impedit dolorum quam ducimus libero explicabo voluptatum officiis. Ipsum esse in sunt autem ipsam!"
        },
        {id: 2, date: "23 sep 2021", likesCount: 7, text: "Hey, why nobody love me?"},
        {id: 3, date: "21 sep 2021", likesCount: 913, text: "This is my first post. Now I'm with you!"}
    ],
    profile: null,
    userStatus: '',
    isFetching: false
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 4,
                likesCount: 0,
                text: action.newPostBody
            }
            return {
                ...state,
                posts: [newPost, ...state.posts],
            };
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
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default:
            return state;
    }
}

export const addPost = newPostBody => ({type: ADD_POST, newPostBody});
export const setUserProfile = profile => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = status => ({type: SET_USER_STATUS, status});
export const toggleIsFetching = isFetching => ({type: TOGGLE_IS_FETCHING, isFetching});

export const getUserProfile = userId => async dispatch => {
    dispatch(toggleIsFetching(true));

    let data = await profileAPI.getUserProfile(userId);
    dispatch(setUserProfile(data));

    dispatch(toggleIsFetching(false));
}

export const getUserStatus = userId => async dispatch => {
    dispatch(toggleIsFetching(true));

    let data = await profileAPI.getUserStatus(userId)
    dispatch(setUserStatus(data));

    dispatch(toggleIsFetching(false));
}

export const updateUserStatus = status => async dispatch => {
    let response = await profileAPI.updateUserStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
}

export default profileReducer;
