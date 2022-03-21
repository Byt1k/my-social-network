import React, {useEffect} from "react";
import Profile from "./Profile";
import {getUserProfile, getUserStatus, updateUserStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const ProfileContainer = props => {
    let {userId} = useParams();
    if (!userId) {
        userId = props.authorizedUserId;
    }
    useEffect(() => {
        props.getUserProfile(userId);
        props.getUserStatus(userId);
    }, [userId])

    return (
        props.isFetching ? <Preloader/> :
            <Profile profile={props.profile} userStatus={props.userStatus}
                     updateUserStatus={props.updateUserStatus}/>
    )
}

let mapStateToProps = state => {
    return ({
        profile: state.profilePage.profile,
        userStatus: state.profilePage.userStatus,
        isFetching: state.profilePage.isFetching,
        authorizedUserId: state.auth.userId
    })
}

export default compose(connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
    withAuthRedirect)(ProfileContainer)