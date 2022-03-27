import React, {useEffect} from "react";
import Profile from "./Profile";
import {addPost, getUserProfile, getUserStatus, updateMainPhoto, updateUserStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const ProfileContainer = props => {
    let {userId} = useParams();
    let isOwner = false;
    if (!userId) {
        userId = props.authorizedUserId;
        isOwner = true;
    }
    useEffect(() => {
        props.getUserProfile(userId);
        props.getUserStatus(userId);
    }, [userId])

    return (
        props.isFetching ? <Preloader/> :
            <Profile profile={props.profile}
                     userStatus={props.userStatus}
                     updateUserStatus={props.updateUserStatus}
                     isOwner={isOwner}
                     updateMainPhoto={props.updateMainPhoto}
                     setEditModeProfileData={props.setEditModeProfileData}
                     setPhotoUploadMode={props.setPhotoUploadMode}
                     posts={props.posts}
                     addPost={props.addPost}
            />
    )
}

let mapStateToProps = state => {
    return ({
        profile: state.profilePage.profile,
        userStatus: state.profilePage.userStatus,
        isFetching: state.profilePage.isFetching,
        authorizedUserId: state.auth.userId,
        posts: state.profilePage.posts
    })
}

export default compose(connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, updateMainPhoto, addPost}),
    withAuthRedirect)(ProfileContainer)