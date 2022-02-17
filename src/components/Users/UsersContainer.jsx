import React from "react";
import {connect} from "react-redux";
import {
    setCurrenPage,
    setTotalCount,
    setUsers,
    toggleFollow, toggleFollowingInProgress,
    toggleIsFetching
} from "../../redux/users-reducer";
import * as axios from "axios";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                this.props.setUsers(data.items);
                this.props.setTotalCount(data.totalCount);
                this.props.toggleIsFetching(false);
            });

    }

    onChangePage = pageNumber => {
        this.props.setCurrenPage(pageNumber);
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
                this.props.setUsers(data.items);
                this.props.toggleIsFetching(false);
            });
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : <Users
                totalCount={this.props.totalCount}
                pageSize={this.props.pageSize}
                users={this.props.users}
                onChangePage={this.onChangePage}
                currentPage={this.props.currentPage}
                toggleFollow={this.props.toggleFollow}
                toggleFollowingInProgress={this.props.toggleFollowingInProgress}
                followingInProgress={this.props.followingInProgress}
            />}
        </>
    }
}

const mapStateToProps = state => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalCount: state.usersPage.totalCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        toggleFollowingInProgress: state.usersPage.toggleFollowingInProgress,
        followingInProgress: state.usersPage.followingInProgress
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         toggleFollow: userId => dispatch(toggleFollowAC(userId)),
//         setUsers: users => dispatch(setUsersAC(users)),
//         setTotalCount: totalCount => dispatch(setTotalCountAC(totalCount)),
//         setCurrenPage: pageNumber => dispatch(setCurrenPageAC(pageNumber)),
//         toggleIsFetching: isFetching => dispatch(toggleIsFetchingAC(isFetching))
//     }
// }

export default connect(mapStateToProps, {toggleFollow, setUsers, setTotalCount, setCurrenPage, toggleIsFetching, toggleFollowingInProgress})(UsersContainer);

