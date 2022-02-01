import s from './Posts.module.css';
import CreatePost from "./CreatePost/CreatePost";
import Post from "./Post/Post";

const Posts = props => {

    let postsElements = props.posts.map(post => <Post date={post.date} likesCount={post.likesCount} text={post.text}/>);

    return (
        <div className={s.posts}>
            <div className={s.title}>My posts</div>
            <CreatePost />
            {postsElements}
        </div>
    );
}

export default Posts;