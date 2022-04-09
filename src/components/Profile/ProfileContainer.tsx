import {FC, useEffect} from "react";
import Profile from "./Profile";
import {addPost, getUserProfile, getUserStatus, updateMainPhoto, updateUserStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {PostType, ProfilePhotosType, ProfileType} from "../../types/types";
import {GlobalStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    profile: ProfileType
    userStatus: string
    isFetching: boolean
    authorizedUserId: number
    posts: Array<PostType>
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    addPost: (newPostBody: string, currentDate: string, newPostId: number) => void
}

type OwnPropsType = {
    setEditModeProfileData: (editModeProfileData: boolean) => void
    setPhotoUploadMode: (photoUploadMode: boolean) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const ProfileContainer: FC<PropsType> = (props) => {
    let {id} = useParams();
    let userId = +id;
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
                     setEditModeProfileData={props.setEditModeProfileData}
                     setPhotoUploadMode={props.setPhotoUploadMode}
                     posts={props.posts}
                     addPost={props.addPost}
            />
    )
}

let mapStateToProps = (state: GlobalStateType): MapStatePropsType => {
    return ({
        profile: state.profilePage.profile,
        userStatus: state.profilePage.userStatus,
        isFetching: state.profilePage.isFetching,
        authorizedUserId: state.auth.userId,
        posts: state.profilePage.posts
    })
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, GlobalStateType>(mapStateToProps,
        {getUserProfile, getUserStatus, updateUserStatus, addPost}),
    withAuthRedirect)(ProfileContainer)