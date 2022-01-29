import s from './CreatePost.module.css';

const CreatePost = () => {
    const background = {
        background: 'url(https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/fl4bzxx2pvifrjtc4l6x) no-repeat center center / cover'
    }
    const imageMartin = {
        background: 'url(https://www.onlineheadway.com/assets/img/courses/06.jpg) no-repeat center center / cover'
    }
    return (
        <form className={s.newPost}>
            <textarea placeholder="Your news..."></textarea>
            <button type="submit">Send</button>
        </form>
    );
}

export default CreatePost;