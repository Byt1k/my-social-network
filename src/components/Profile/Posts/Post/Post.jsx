import s from './Post.module.css';

const Post = (props) => {
    const background = {
        background: 'url(https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/fl4bzxx2pvifrjtc4l6x) no-repeat center center / cover'
    }
    const imageMartin = {
        background: 'url(https://www.onlineheadway.com/assets/img/courses/06.jpg) no-repeat center center / cover'
    }
    return (
        <div className={s.item}>
            <div className={s.title}>
                <div className={s.ava} style={imageMartin}></div>
                <div>
                    <p className={s.name}>Martin James</p>
                    <p className={s.date}>{props.date}</p>
                </div>
            </div>
            <div>
                <div className={s.text}>{props.text}</div>
                <div className={s.info}>
                    <button className={s.likes}>
                        <img src="https://cdn-icons.flaticon.com/png/512/2589/premium/2589197.png?token=exp=1643455589~hmac=587ad2293570782924868de547bcf1e3" alt="" />
                        <p>{props.likesCount}</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Post;