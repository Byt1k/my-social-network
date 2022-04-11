import Pagination from "../common/Pagination/Pagination"
import UsersItem from "./UsersItem/UsersItem"
// @ts-ignore
import s from './Users.module.css'
import {UserType} from "../../types/types"
import {FC} from "react"

type PropsType = {
    totalCount: number
    pageSize: number
    onChangePage: (pageNumber: number) => void
    currentPage: number
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Users: FC<PropsType> = ({totalCount, pageSize, onChangePage, currentPage, users, followingInProgress, follow, unfollow}) => {
    return (
        <div className={s.users}>
            {
                users.map(u => <UsersItem key={u.id} user={u} followingInProgress={followingInProgress} follow={follow}
                                          unfollow={unfollow}/>)
            }
            <Pagination totalCount={totalCount} pageSize={pageSize} onChangePage={onChangePage}
                        currentPage={currentPage}/>
        </div>
    )
}

export default Users