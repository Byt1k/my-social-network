import users from "../components/Users/Users";

const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: [
        {id: 1, followed: false, fullName: 'Lukas Podolski', avatar: 'https://grantavto.com.ua/files/photos/4/32.jpg', location: {country: 'Belarus', city: 'Minsk'}},
         {id: 2, followed: true, fullName: 'Eva Martines', avatar: 'https://c4.wallpaperflare.com/wallpaper/691/864/895/women-face-portrait-gray-eyes-wallpaper-preview.jpg', location: {country: 'Belarus', city: 'Minsk'}},
         {id: 3, followed: false, fullName: 'Anna Ferdinandes', avatar: 'https://t3.ftcdn.net/jpg/02/30/78/14/360_F_230781458_ER2KGThsKsV05VBN2sFlIDLMP0JEkZ0o.jpg', location: {country: 'Belarus', city: 'Minsk'}}
     ]
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FOLLOW :
            return   {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: !u.followed}
                    }
                    return u;
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users ]
            }
        default: return state;
    }
}

export let toggleFollowAC = userID => ({type: TOGGLE_FOLLOW, userID});
export let setUsersAC = users => ({type: SET_USERS, users})

export default usersReducer;
