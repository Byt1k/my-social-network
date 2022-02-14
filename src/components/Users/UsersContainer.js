import React from "react";
import {connect} from "react-redux";
import Users from './Users'
import {setCurrenPageAC, setTotalCountAC, setUsersAC, toggleFollowAC} from "../../redux/users-reducer";

const mapStateToProps = state => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalCount: state.usersPage.totalCount,
        currentPage: state.usersPage.currentPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleFollow: userId => dispatch(toggleFollowAC(userId)),
        setUsers: users => dispatch(setUsersAC(users)),
        setTotalCount: totalCount => dispatch(setTotalCountAC(totalCount)),
        setCurrenPage: pageNumber => dispatch(setCurrenPageAC(pageNumber))
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;