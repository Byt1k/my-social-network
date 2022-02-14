import React from "react";
import {connect} from "react-redux";
import {setCurrenPageAC, setTotalCountAC, setUsersAC, toggleFollowAC} from "../../redux/users-reducer";
import * as axios from "axios";
import Users from "./Users";

class UsersAPIComponent extends React.Component {
    componentDidMount() {
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalCount(response.data.totalCount);
            });

    }

    onChangePage = pageNumber => {
        this.props.setCurrenPage(pageNumber);
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    }

    render() {
        return <Users
            totalCount={this.props.totalCount}
            pageSize={this.props.pageSize}
            users={this.props.users}
            onChangePage={this.onChangePage}
            currentPage={this.props.currentPage}
            toggleFollow={this.props.toggleFollow} />
    }
}

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

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent);

export default UsersContainer;

