import s from './Profile.module.css';
import Posts from "./Posts/Posts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import React from "react";

const Profile = props => {
   return (
        <div>
            <ProfileInfo />
            <Posts state={props.state} dispatch={props.dispatch}/>
        </div>
    );
}

export default Profile;