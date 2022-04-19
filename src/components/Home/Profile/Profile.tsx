import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";
import Preloader from "../../common/Preloader/Preloader";
import {FC, useEffect} from "react";
import {getProfilePageData} from "../../../redux/selectors/profile-selectors";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getFollowingInProgress} from "../../../redux/selectors/users-selectors";
import {follow, unfollow} from "../../../redux/users-reducer";
import {actionsProfile, getUserProfile, getUserStatus, updateUserStatus} from "../../../redux/profile-reducer";
import {getAuthorizedUserId} from "../../../redux/selectors/auth-selectors";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {getIsFetching} from "../../../redux/selectors/app-selectors";

type PropsType = {
    setEditModeProfileData?: (editModeProfileData: boolean) => void
    setPhotoUploadMode?: (photoUploadMode: boolean) => void
}

const Profile: FC<PropsType> = props => {
    const dispatch = useDispatch();

    const authorizedUserId = useSelector(getAuthorizedUserId)

    let {userId} = useParams()
    let isOwner = false
    if (!userId) {
        // @ts-ignore
        userId = authorizedUserId;
        isOwner = true;
    }
    useEffect(() => {
        // @ts-ignore
        dispatch(getUserStatus(userId))
        // @ts-ignore
        dispatch(getUserProfile(userId))
    }, [userId])

    const profilePageData = useSelector(getProfilePageData)
    const {posts, profile, userStatus} = profilePageData
    const isFetching = useSelector(getIsFetching)
    const followingInProgress = useSelector(getFollowingInProgress)

    const followUser = (userId: number) => {
      dispatch(follow(userId));
    }

    const unfollowUser = (userId: number) => {
      dispatch(unfollow(userId));
    }

    const updateStatus = (status: string) => {
        dispatch(updateUserStatus(status))
    }

    const addPost = (newPostBody: string, currentDate: string, newPostId: number) => {
        dispatch(actionsProfile.addPost(newPostBody, currentDate, newPostId))
    }

    if (!profile || isFetching) {
        return <Preloader/>
    }

    return (
        <div>
            <ProfileInfo profile={profile}
                         userStatus={userStatus}
                         updateUserStatus={updateStatus}
                         isOwner={isOwner}
                         setEditModeProfileData={props.setEditModeProfileData}
                         setPhotoUploadMode={props.setPhotoUploadMode}
                         follow={followUser}
                         unfollow={unfollowUser}
                         followingInProgress={followingInProgress}
            />
            <MyPosts isOwner={isOwner} profile={profile} posts={posts} addPost={addPost}/>
        </div>
    )
}

export const ProfilePage = withAuthRedirect(Profile)