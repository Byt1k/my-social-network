import s from './Profile.module.css';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = props => {
   return (
        <div>
            <ProfileInfo profile={props.profile} userStatus={props.userStatus} updateUserStatus={props.updateUserStatus}/>
            <MyPostsContainer />
        </div>
    );
}

export default Profile;