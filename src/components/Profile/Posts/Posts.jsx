import s from './Posts.module.css';
import CreatePost from "./CreatePost/CreatePost";
import Post from "./Post/Post";

const Posts = () => {
    const background = {
        background: 'url(https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/fl4bzxx2pvifrjtc4l6x) no-repeat center center / cover'
    }
    const imageMartin = {
        background: 'url(https://www.onlineheadway.com/assets/img/courses/06.jpg) no-repeat center center / cover'
    }
    return (
        <div className={s.posts}>
            <div className={s.title}>My posts</div>
            <CreatePost />
            <Post date="25 sep 2021" likesCount={13} text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto optio illo pariatur molestiae sapiente similique, velit impedit dolorum quam ducimus libero explicabo voluptatum officiis. Ipsum esse in sunt autem ipsam!"/>
            <Post date="23 sep 2021" likesCount={7} text="Hey, why nobody love me?"/>
            <Post date="21 sep 2021" likesCount={913} text="This is my first post. Now I'm with you!"/>
        </div>
    );
}

export default Posts;