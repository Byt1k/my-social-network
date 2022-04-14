import {FC, useEffect} from "react";
import Profile from "./Profile";
import {actionsProfile, getUserProfile, getUserStatus, updateUserStatus} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {PostType, ProfileType} from "../../../types/types";
import {GlobalStateType} from "../../../redux/redux-store";

type MapStatePropsType = {
    profile: ProfileType | null
    userStatus: string
    isFetching: boolean
    authorizedUserId: number | null
    posts: Array<PostType>
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    addPost: (newPostBody: string, currentDate: string, newPostId: number) => void
}

type OwnPropsType = {
    setEditModeProfileData?: (editModeProfileData: boolean) => void
    setPhotoUploadMode?: (photoUploadMode: boolean) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const ProfileContainer: FC<PropsType> = (props) => {
    let {userId} = useParams()
    let isOwner = false
    if (!userId) {
        // @ts-ignore
        userId = props.authorizedUserId;
        isOwner = true;
    }
    useEffect(() => {
        // @ts-ignore
        props.getUserStatus(userId)
        // @ts-ignore
        props.getUserProfile(userId)
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

const mapStateToProps = (state: GlobalStateType): MapStatePropsType => {
    return ({
        profile: state.profilePage.profile,
        userStatus: state.profilePage.userStatus,
        isFetching: state.profilePage.isFetching,
        authorizedUserId: state.auth.userId,
        posts: state.profilePage.posts
    })
}

export default compose<FC<OwnPropsType>>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, GlobalStateType>(mapStateToProps,
        {getUserProfile, getUserStatus, updateUserStatus, addPost: actionsProfile.addPost}),
    withAuthRedirect)(ProfileContainer)