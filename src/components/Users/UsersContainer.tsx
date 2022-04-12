import {FC, useEffect} from "react"
import {connect} from "react-redux"
import {
    follow,
    getUsers, actionsUsers,
    unfollow,
} from "../../redux/users-reducer"
import Users from "./Users"
import Preloader from "../common/Preloader/Preloader"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import {compose} from "redux"
import {GlobalStateType} from "../../redux/redux-store"
import {UserType} from "../../types/types"

type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (pageNumber: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const UsersContainer: FC<PropsType> = props => {
    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize)
    }, [props.currentPage, props.pageSize])

    const onChangePage = (pageNumber: number) => {
        props.setCurrentPage(pageNumber);
        props.getUsers(pageNumber, props.pageSize)
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

const mapStateToProps = (state: GlobalStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalCount: state.usersPage.totalCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, {}, GlobalStateType>(mapStateToProps,
    {getUsers, follow, unfollow, setCurrentPage: actionsUsers.setCurrentPage}),
    // @ts-ignore
    withAuthRedirect)(UsersContainer)

