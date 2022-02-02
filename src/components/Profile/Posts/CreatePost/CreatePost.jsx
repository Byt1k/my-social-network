import s from './CreatePost.module.css';
import React from "react";

const CreatePost = props => {
    let newPostTextarea = React.createRef();

    const changeNewPostText = () => {
        let newPostText = newPostTextarea.current.value;
        props.updateNewPostText(newPostText);
    }

    return (
        <div className={s.newPost}>
            <textarea onChange={changeNewPostText} placeholder="Your news..." ref={newPostTextarea} value={props.newPostText}/>
            <button onClick={props.addPost}>Send</button>
        </div>
    );
}

export default CreatePost;