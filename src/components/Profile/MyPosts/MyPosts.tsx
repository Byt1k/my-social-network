// @ts-ignore
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {FC} from "react";
import {Field, reduxForm, reset} from "redux-form";
import {Textarea} from "../../common/FieldsForm/FieldsForm";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {PostType, ProfileType} from "../../../types/types";

let NewPostForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className={s.newPost}>
            <Field component={Textarea} name="newPostBody" placeholder="Your news..." required={true} />
            <button>Send</button>
        </form>
    );
}

NewPostForm = reduxForm({form: 'addNewPost'})(NewPostForm);

type PropsType = {
    posts: Array<PostType>
    profile: ProfileType
    isOwner: boolean
    addPost: (newPostBody: string, currentDate: string, newPostId: number) => void
}

const MyPosts: FC<PropsType> = ({posts, profile, isOwner, addPost}) => {

    let postsElements = posts.map(p => <Post key={p.id} profile={profile} date={p.date} likesCount={p.likesCount} text={p.text}/>);

    const sendPost = (values, dispatch) => {
        // Получение даты поста
        let currentDate = getCurrentDate();

        // Генерация нового id для поста
        let newPostId = posts.length + 1;

        addPost(values.newPostBody, currentDate, newPostId);

        // очистка формы
        dispatch(reset('addNewPost'));
    };

    return (
        <div className={s.posts}>
            <div className={s.title}>{isOwner ? 'My posts' : 'Posts'}</div>
            {isOwner && <NewPostForm onSubmit={sendPost} />}
            {postsElements}
        </div>
    );
}

export default MyPosts;