import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";
import Preloader from "../common/Preloader/Preloader";
import {FC} from "react";
import {PostType, ProfileType} from "../../types/types";

type PropsType = {
    profile: ProfileType | null
    userStatus: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    setEditModeProfileData?: (editModeProfileData: boolean) => void
    setPhotoUploadMode?: (photoUploadMode: boolean) => void
    posts: Array<PostType>
    addPost: (newPostBody: string, currentDate: string, newPostId: number) => void
}

const Profile: FC<PropsType> = props => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <ProfileInfo profile={props.profile}
                         userStatus={props.userStatus}
                         updateUserStatus={props.updateUserStatus}
                         isOwner={props.isOwner}
                         setEditModeProfileData={props.setEditModeProfileData}
                         setPhotoUploadMode={props.setPhotoUploadMode}
            />
            <MyPosts isOwner={props.isOwner} profile={props.profile} posts={props.posts} addPost={props.addPost}/>
        </div>
    );
}

export default Profile;