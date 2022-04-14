import Pagination from "../../common/Pagination/Pagination"
import UsersItem from "./UsersItem/UsersItem"
import s from './Users.module.css'
import {UserType} from "../../../types/types"
import {FC} from "react"
import {UsersSearchForm, ValuesType} from "./UsersSearchForm/UsersSearchForm";
import {FormikHelpers} from "formik";
import Preloader from "../../common/Preloader/Preloader";

type PropsType = {
    totalCount: number
    pageSize: number
    onChangePage: (pageNumber: number) => void
    currentPage: number
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    isFriends?: boolean
    onSubmitUsersSearchForm: (values: ValuesType, {setSubmitting}: FormikHelpers<ValuesType>) => void
    term: string
    isFetching: boolean
}

const Users: FC<PropsType> = ({
                                  totalCount, pageSize, onChangePage, currentPage,
                                  users, followingInProgress, follow, unfollow,
                                  isFriends, onSubmitUsersSearchForm, term, isFetching
                              }) => {
    return (
        <>
            {!isFriends && <UsersSearchForm onSubmitUsersSearchForm={onSubmitUsersSearchForm} term={term}/>}
            {isFetching ? <Preloader /> : <div className={s.users}>
                {isFriends && (
                    <div className={s.myFriendsTitle}>
                        <p>My friends</p>
                        <span>{totalCount}</span>
                    </div>
                )}
                {
                    users.map(u => <UsersItem key={u.id} user={u} followingInProgress={followingInProgress}
                                              follow={follow}
                                              unfollow={unfollow}/>)
                }
                <Pagination totalCount={totalCount} pageSize={pageSize} onChangePage={onChangePage}
                            currentPage={currentPage}/>
            </div>}
        </>
    )
}

export default Users