import {FC, useEffect} from "react"
import {connect} from "react-redux"
import {actionsUsers, follow, getUsers, unfollow,} from "../../../redux/users-reducer"
import Users from "./Users"
import {withAuthRedirect} from "../../../hoc/withAuthRedirect"
import {compose} from "redux"
import {GlobalStateType} from "../../../redux/redux-store"
import {UserType} from "../../../types/types"
import {FormikHelpers} from "formik";
import {ValuesType} from "./UsersSearchForm/UsersSearchForm";

type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    term: string
}

type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number, term: string, isFriend?: boolean) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (pageNumber: number) => void
}

type OwnPropsType = {
    isFriends?: boolean
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const UsersContainer: FC<PropsType> = ({getUsers, setCurrentPage, ...props}) => {

    useEffect(() => {
        props.isFriends ? props.term = '' : null
        getUsers(props.currentPage, props.pageSize, props.term, props.isFriends)
    }, [props.currentPage, props.pageSize, props.isFriends])

    useEffect(() => {
        setCurrentPage(1)
    }, [props.isFriends])

    const onChangePage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        getUsers(pageNumber, props.pageSize, props.term, props.isFriends)
    }

    const onSubmitUsersSearchForm = (values: ValuesType, {setSubmitting}: FormikHelpers<ValuesType>) => {
        setCurrentPage(1)
        getUsers(1, props.pageSize, values.term, props.isFriends)
        setSubmitting(false)
    }

    return <Users {...props} onChangePage={onChangePage} onSubmitUsersSearchForm={onSubmitUsersSearchForm} />
}

const mapStateToProps = (state: GlobalStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalCount: state.usersPage.totalCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        term: state.usersPage.term
    }
}

export default compose<FC<OwnPropsType>>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, GlobalStateType>(mapStateToProps,
        {getUsers, follow, unfollow, setCurrentPage: actionsUsers.setCurrentPage}),
    withAuthRedirect)(UsersContainer)

