import s from './Profile.module.css';
import Posts from "./Posts/Posts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import React from "react";

const Profile = props => {
   return (
        <div>
            <ProfileInfo />
            <Posts state={props.state} addPost={props.addPost} updateNewPostText={props.updateNewPostText}/>
        </div>
    );
}

export default Profile;