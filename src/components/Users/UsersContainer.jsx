import React from "react";
import {connect} from "react-redux";
import {
    follow,
    getUsers, setCurrentPage,
    unfollow,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);

    }

    onChangePage = pageNumber => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : <Users
                totalCount={this.props.totalCount}
                pageSize={this.props.pageSize}
                users={this.props.users}
                onChangePage={this.onChangePage}
                currentPage={this.props.currentPage}
                followingInProgress={this.props.followingInProgress}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
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

let AuthRedirectComponent = withAuthRedirect(UsersContainer);

export default connect(mapStateToProps, {getUsers, follow, unfollow, setCurrentPage})(AuthRedirectComponent);

