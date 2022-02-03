import s from './CreatePost.module.css';
import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../../redux/state";

const CreatePost = props => {
    let newPostTextarea = React.createRef();

    const addPost = () => props.dispatch(addPostActionCreator());

    const changeNewPostText = () => {
        let newPostText = newPostTextarea.current.value;
        props.dispatch(updateNewPostTextActionCreator(newPostText));
    }

    return (
        <div className={s.newPost}>
            <textarea onChange={changeNewPostText} placeholder="Your news..." ref={newPostTextarea} value={props.newPostText}/>
            <button onClick={addPost}>Send</button>
        </div>
    );
}

export default CreatePost;