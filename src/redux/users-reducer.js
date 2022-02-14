const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'CHANGE_PAGE';

let initialState = {
    users: [],
    pageSize: 10,
    totalCount: 0,
    currentPage: 1
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
                users: action.users
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.totalCount
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.pageNumber
            }
        default:
            return state;
    }
}

export let toggleFollowAC = userID => ({type: TOGGLE_FOLLOW, userID});
export let setUsersAC = users => ({type: SET_USERS, users});
export let setTotalCountAC = totalCount => ({type: SET_TOTAL_COUNT, totalCount});
export let setCurrenPageAC = pageNumber => ({type: SET_CURRENT_PAGE, pageNumber})

export default usersReducer;
