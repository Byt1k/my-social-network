import s from './CreatePost.module.css';
import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../../redux/state";

const CreatePost = props => {

    const addPost = () => props.dispatch(addPostActionCreator());

    const changeNewPostText = e => {
        let newPostText = e.target.value;
        props.dispatch(updateNewPostTextActionCreator(newPostText));
    }

    return (
        <div className={s.newPost}>
            <textarea onChange={changeNewPostText} placeholder="Your news..." value={props.newPostText}/>
            <button onClick={addPost}>Send</button>
        </div>
    );
}

export default CreatePost;