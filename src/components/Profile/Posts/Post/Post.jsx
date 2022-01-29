import s from './Post.module.css';

const Post = () => {
    const background = {
        background: 'url(https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/fl4bzxx2pvifrjtc4l6x) no-repeat center center / cover'
    }
    const imageMartin = {
        background: 'url(https://www.onlineheadway.com/assets/img/courses/06.jpg) no-repeat center center / cover'
    }
    return (
        <div className={s.item}>
            <div className={s.ava} style={imageMartin}></div>
            <div>
                <p className={s.text}>This is my first post. Now I'm with you!</p>
                <p className={s.date}>22 Sep</p>
            </div>
        </div>
    );
}

export default Post;