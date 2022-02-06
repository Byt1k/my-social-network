import MyPosts from "./MyPosts";
import {addPostCreator, updateNewPostTextCreator} from "../../../redux/profile-reducer";
import React from "react";

const MyPostsContainer = props => {
    let state = props.store.getState().profilePage;

    const addPost = () => {
        props.store.dispatch(addPostCreator());
    }

    const updateNewPostText = text => {
        props.store.dispatch(updateNewPostTextCreator(text));
    }

    return <MyPosts addPost={addPost} updateNewPostText={updateNewPostText} posts={state.posts} newPostText={state.newPostText}/>
}

export default MyPostsContainer;