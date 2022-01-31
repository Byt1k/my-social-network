import s from './Posts.module.css';
import CreatePost from "./CreatePost/CreatePost";
import Post from "./Post/Post";

const Posts = () => {
    let postsData = [
        {id: 1, date: "25 sep 2021", likesCount: 13, text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto optio illo pariatur molestiae sapiente similique, velit impedit dolorum quam ducimus libero explicabo voluptatum officiis. Ipsum esse in sunt autem ipsam!"},
        {id: 2, date: "23 sep 2021", likesCount: 7, text: "Hey, why nobody love me?"},
        {id: 3, date: "21 sep 2021", likesCount: 913, text: "This is my first post. Now I'm with you!"}
    ]

    let postsElements = postsData.map(post => <Post date={post.date} likesCount={post.likesCount} text={post.text}/>);

    return (
        <div className={s.posts}>
            <div className={s.title}>My posts</div>
            <CreatePost />
            {postsElements}
        </div>
    );
}

export default Posts;