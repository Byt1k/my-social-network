import s from './MyPosts.module.css';
import Post from "./Post/Post";
import React from "react";
import {Field, reduxForm, reset} from "redux-form";
import {Textarea} from "../../common/FieldsForm/FieldsForm";
import {getCurrentDate} from "../../../utils/getCurrentDate";

let NewPostForm = props => {
    return (
        <form onSubmit={props.handleSubmit} className={s.newPost}>
            <Field component={Textarea} name="newPostBody" placeholder="Your news..." required={true} />
            <button>Send</button>
        </form>
    );
}

NewPostForm = reduxForm({form: 'addNewPost'})(NewPostForm);

const MyPosts = props => {

    let postsElements = props.posts.map(post => <Post key={post.id} profile={props.profile} date={post.date} likesCount={post.likesCount} text={post.text}/>);

    const addPost = (values, dispatch) => {
        // Получение даты поста
        let currentDate = getCurrentDate();

        // Генерация нового id для поста
        let newPostId = props.posts.length + 1;

        props.addPost(values.newPostBody, currentDate, newPostId);

        // очистка формы
        dispatch(reset('addNewPost'));
    };

    return (
        <div className={s.posts}>
            <div className={s.title}>{props.isOwner ? 'My posts' : 'Posts'}</div>
            {props.isOwner && <NewPostForm onSubmit={addPost} />}
            {postsElements}
        </div>
    );
}

export default MyPosts;