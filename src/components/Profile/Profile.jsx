import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = props => {
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
            <MyPostsContainer/>
        </div>
    );
}

export default Profile;