import MyPosts from "./MyPosts";
import {addPostCreator, updateNewPostTextCreator} from "../../../redux/profile-reducer";
import React from "react";
import StoreContext from "../../../StoreContext";

const MyPostsContainer = props => {
    return (
        <StoreContext.Consumer>
            {store => {
                let state = store.getState().profilePage;

                const addPost = () => {
                    store.dispatch(addPostCreator());
                }

                const updateNewPostText = text => {
                    store.dispatch(updateNewPostTextCreator(text));
                }
                return <MyPosts addPost={addPost} updateNewPostText={updateNewPostText} posts={state.posts} newPostText={state.newPostText}/>
            }}
        </StoreContext.Consumer>
    );
}

export default MyPostsContainer;