import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {FC} from "react";
import {Field, FormAction, InjectedFormProps, reduxForm, reset} from "redux-form";
import {Textarea} from "../../../common/FieldsForm/FieldsForm";
import {getCurrentDate} from "../../../../utils/getCurrentDate";
import {PostType, ProfileType} from "../../../../types/types";
import {Dispatch} from "redux";

type NewPostFormValuesType = {
    newPostBody: string
}

const NewPostForm: FC<InjectedFormProps<NewPostFormValuesType>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className={s.newPost}>
            <Field component={Textarea} name="newPostBody" placeholder="Your news..." required={true} />
            <button>Send</button>
        </form>
    );
}

const NewPostReduxForm = reduxForm<NewPostFormValuesType>({form: 'addNewPost'})(NewPostForm);

type PropsType = {
    posts: Array<PostType>
    profile: ProfileType
    isOwner: boolean
    addPost: (newPostBody: string, currentDate: string, newPostId: number) => void
}

const MyPosts: FC<PropsType> = ({posts, profile, isOwner, addPost}) => {

    let postsElements = posts.map(p => <Post key={p.id} profile={profile} date={p.date} likesCount={p.likesCount} text={p.text}/>);

    const sendPost = (values: NewPostFormValuesType, dispatch: Dispatch<FormAction>) => {
        // Получение даты поста
        const currentDate = getCurrentDate();

        // Генерация нового id для поста
        const newPostId = posts.length + 1;

        addPost(values.newPostBody, currentDate, newPostId);

        // очистка формы
        // перенести потом в санку
        dispatch(reset('addNewPost'));
    };

    return (
        <div className={s.posts}>
            <div className={s.title}>{isOwner ? 'My posts' : 'Posts'}</div>
            {isOwner && <NewPostReduxForm onSubmit={sendPost} />}
            {postsElements}
        </div>
    );
}

export default MyPosts;