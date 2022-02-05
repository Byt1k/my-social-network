import s from './CreatePost.module.css';
import React from "react";
import {addPostCreator, updateNewPostTextCreator} from "../../../../redux/profile-reducer";

const CreatePost = props => {

    const addPost = () => props.dispatch(addPostCreator());

    const changeNewPostText = e => {
        let newPostText = e.target.value;
        props.dispatch(updateNewPostTextCreator(newPostText));
    }

    return (
        <div className={s.newPost}>
            <textarea onChange={changeNewPostText} placeholder="Your news..." value={props.newPostText}/>
            <button onClick={addPost}>Send</button>
        </div>
    );
}

export default CreatePost;