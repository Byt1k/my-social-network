import s from './MyPosts.module.css';
import Post from "./Post/Post";
import React from "react";

const MyPosts = props => {

    let postsElements = props.posts.map(post => <Post date={post.date} likesCount={post.likesCount} text={post.text}/>);

    const addPost = () => props.addPost();

    const changeNewPostText = e => props.updateNewPostText(e.target.value);

    return (
        <div className={s.posts}>
            <div className={s.title}>My posts</div>
            <div className={s.newPost}>
                <textarea onChange={changeNewPostText} placeholder="Your news..." value={props.newPostText}/>
                <button onClick={addPost}>Send</button>
            </div>
            {postsElements}
        </div>
    );
}

export default MyPosts;