import s from './Profile.module.css';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = props => {
   return (
        <div>
            <ProfileInfo />
            <MyPostsContainer store={props.store}/>
            {/*<MyPosts state={props.state} dispatch={props.dispatch} store={props.store}/>*/}
        </div>
    );
}

export default Profile;