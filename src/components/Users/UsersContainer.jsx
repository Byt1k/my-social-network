import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
    follow,
    requestUsers, setCurrentPage,
    unfollow,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getToggleFollowingInProgress,
    getTotalCount,
    getUsers
} from "../../redux/users-selectors";

const UsersContainer = props => {
    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize)
    }, [props.currentPage, props.pageSize])

    const onChangePage = pageNumber => {
        props.setCurrentPage(pageNumber);
        props.getUsers(pageNumber, this.props.pageSize);
    }

    return <>
        {props.isFetching ? <Preloader/> : <Users
            totalCount={props.totalCount}
            pageSize={props.pageSize}
            users={props.users}
            onChangePage={onChangePage}
            currentPage={props.currentPage}
            followingInProgress={props.followingInProgress}
            follow={props.follow}
            unfollow={props.unfollow}
        />}
    </>
}

// Использование селекторов
const mapStateToProps = state => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        toggleFollowingInProgress: getToggleFollowingInProgress(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(connect(mapStateToProps, {
    getUsers: requestUsers,
    follow,
    unfollow,
    setCurrentPage
}), withAuthRedirect)(UsersContainer)

