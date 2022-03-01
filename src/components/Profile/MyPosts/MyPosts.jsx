import s from './MyPosts.module.css';
import Post from "./Post/Post";
import React from "react";
import {Field, reduxForm} from "redux-form";

let NewPostForm = props => {
    return (
        <form onSubmit={props.handleSubmit} className={s.newPost}>
            <Field component="textarea" name="newPostBody" placeholder="Your news..."/>
            <button>Send</button>
        </form>
    );
}

NewPostForm = reduxForm({form: 'addNewPost'})(NewPostForm);

const MyPosts = props => {

    let postsElements = props.posts.map(post => <Post date={post.date} likesCount={post.likesCount} text={post.text}/>);

    const addPost = values => {
        props.addPost(values.newPostBody);
    };

    return (
        <div className={s.posts}>
            <div className={s.title}>My posts</div>
            <NewPostForm onSubmit={addPost} />
            {postsElements}
        </div>
    );
}

export default MyPosts;