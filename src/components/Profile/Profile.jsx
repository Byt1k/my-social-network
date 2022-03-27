import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import Preloader from "../common/Preloader/Preloader";

const Profile = props => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <ProfileInfo profile={props.profile}
                         userStatus={props.userStatus}
                         updateUserStatus={props.updateUserStatus}
                         isOwner={props.isOwner}
                         updateMainPhoto={props.updateMainPhoto}
                         setEditModeProfileData={props.setEditModeProfileData}
                         setPhotoUploadMode={props.setPhotoUploadMode}
            />
            <MyPosts isOwner={props.isOwner} profile={props.profile} posts={props.posts} addPost={props.addPost}/>
        </div>
    );
}

export default Profile;