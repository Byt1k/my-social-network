import s from "./ProfileInfo.module.css";

export const ProfileInfo = props => {
    const background = {
        background: 'url(https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/fl4bzxx2pvifrjtc4l6x) no-repeat center center / cover'
    }
    const imageMartin = {
        background: 'url(https://www.onlineheadway.com/assets/img/courses/06.jpg) no-repeat center center / cover'
    }

    return (
    <div>
        <div className={s.background} style={background}></div>
        <div className={s.avaAndName}>
            <div className={s.avatar} style={imageMartin}>
                <div className={s.status}></div>
            </div>
            <p className={s.name}>Martin James</p>
        </div>
        <div className={s.description}>
            <p>Date of Birth: <span>11 April</span></p>
            <p>Country: <span>Belarus</span></p>
            <p>City: <span>Minsk</span></p>
            <p>Education: <span>Military Academy</span></p>
            <p>Web Site: <span>vk.com</span></p>
        </div>
    </div>
        );
}
