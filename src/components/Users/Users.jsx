import React from "react";
import Pagination from "../common/Pagination/Pagination";
import UsersItem from "./UsersItem/UsersItem";

const Users = ({totalCount, pageSize, onChangePage, currentPage, users, followingInProgress, follow, unfollow}) => {
    return (
        <div>
            {
                users.map(u => <UsersItem key={u.id} user={u} followingInProgress={followingInProgress} follow={follow}
                                          unfollow={unfollow}/>)
            }
            <Pagination totalCount={totalCount} pageSize={pageSize} onChangePage={onChangePage}
                        currentPage={currentPage}/>
        </div>
    )
}

export default Users;