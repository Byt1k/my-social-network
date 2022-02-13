const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: [
         // {id: 1, followed: false, name: 'Lukas Podolski', photos: {small: 'https://grantavto.com.ua/files/photos/4/32.jpg'}, location: {country: 'Belarus', city: 'Minsk'}},
         // {id: 2, followed: true, name: 'Eva Martines', photos: {small: 'https://grantavto.com.ua/files/photos/4/32.jpg'}, location: {country: 'Belarus', city: 'Minsk'}},
         // {id: 3, followed: false, name: 'Anna Ferdinandes', photos: {small: 'https://grantavto.com.ua/files/photos/4/32.jpg'}, location: {country: 'Belarus', city: 'Minsk'}}
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
                    return u
                })
            }
        case SET_USERS:
            return {
                ...state,
                // users: [...state.users, ...action.users ]
                users: [...action.users]
            }
        default: return state;
    }
}

export let toggleFollowAC = userID => ({type: TOGGLE_FOLLOW, userID});
export let setUsersAC = users => ({type: SET_USERS, users})

export default usersReducer;
