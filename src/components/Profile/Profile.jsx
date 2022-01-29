import s from './Profile.module.css';
import AvaAndName from "./AvaAndName/AvaAndName";
import Description from "./Description/Description";
import Posts from "./Posts/Posts";

const Profile = () => {
    const background = {
        background: 'url(https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/fl4bzxx2pvifrjtc4l6x) no-repeat center center / cover'
    }
    const imageMartin = {
        background: 'url(https://www.onlineheadway.com/assets/img/courses/06.jpg) no-repeat center center / cover'
    }
    return (
        <div className={s.content}>
            <div className={s.background} style={background}></div>
            <AvaAndName />
            <Description />
            <Posts />
        </div>
    );
}

export default Profile;