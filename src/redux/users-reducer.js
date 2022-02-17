const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'CHANGE_PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS';

let initialState = {
    users: [],
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
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
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: [action.isFollowing
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)]
            }
        default:
            return state;
    }
}

export let toggleFollow = userID => ({type: TOGGLE_FOLLOW, userID});
export let setUsers = users => ({type: SET_USERS, users});
export let setTotalCount = totalCount => ({type: SET_TOTAL_COUNT, totalCount});
export let setCurrenPage = pageNumber => ({type: SET_CURRENT_PAGE, pageNumber});
export let toggleIsFetching = isFetching => ({type: TOGGLE_IS_FETCHING, isFetching});
export let toggleFollowingInProgress = (isFollowing, userId) => ({type: TOGGLE_FOLLOWING_IN_PROGRESS, isFollowing, userId});

export default usersReducer;
