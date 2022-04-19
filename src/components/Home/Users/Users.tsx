import Pagination from "../../common/Pagination/Pagination"
import UsersItem from "./UsersItem/UsersItem"
import s from './Users.module.css'
import {FC, useEffect} from "react"
import {UsersSearchForm, ValuesType} from "./UsersSearchForm/UsersSearchForm";
import {FormikHelpers} from "formik";
import Preloader from "../../common/Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalCount,
    getUsersFilter,
    getUsersSelector
} from "../../../redux/selectors/users-selectors";
import {actionsUsers, follow, getUsers, unfollow} from "../../../redux/users-reducer";
import {getIsFetching} from "../../../redux/selectors/app-selectors";

type PropsType = {
    isFriends?: boolean
}

export const Users: FC<PropsType> = ({isFriends}) => {
    const dispatch = useDispatch();

    const users = useSelector(getUsersSelector)
    const followingInProgress = useSelector(getFollowingInProgress)
    const currentPage = useSelector(getCurrentPage)
    const totalCount = useSelector(getTotalCount)
    const pageSize = useSelector(getPageSize)
    let term = useSelector(getUsersFilter)
    const isFetching = useSelector(getIsFetching)

    useEffect(() => {
        isFriends ? term = '' : null
        dispatch(getUsers(currentPage, pageSize, term, isFriends))
    }, [currentPage, pageSize, isFriends])

    useEffect(() => {
        dispatch(actionsUsers.setCurrentPage(1))
    }, [isFriends])

    const followUser = (userId: number) => {
        dispatch(follow(userId))
    }


    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId))
    }

    const onChangePage = (pageNumber: number) => {
        dispatch(actionsUsers.setCurrentPage(pageNumber))
        getUsers(pageNumber, pageSize, term, isFriends)
    }

    const onSubmitUsersSearchForm = (values: ValuesType, {setSubmitting}: FormikHelpers<ValuesType>) => {
        dispatch(actionsUsers.setCurrentPage(1))
        dispatch(getUsers(1, pageSize, values.term, isFriends))
        setSubmitting(false)
    }

    return (
        <>
            {!isFriends && <UsersSearchForm onSubmitUsersSearchForm={onSubmitUsersSearchForm} term={term}/>}
            {isFetching ? <Preloader /> : (
                <div className={s.users}>
                    {isFriends && (
                        <div className={s.myFriendsTitle}>
                            <p>My friends</p>
                            <span>{totalCount}</span>
                        </div>
                    )}
                    {
                        users.map(u => <UsersItem key={u.id} user={u} followingInProgress={followingInProgress}
                                                  follow={followUser} unfollow={unfollowUser}/>)
                    }
                    <Pagination totalCount={totalCount} pageSize={pageSize} onChangePage={onChangePage}
                                currentPage={currentPage}/>
                </div>
            )}
        </>
    )
}