import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";

export const ProfileInfo = props => {
    const background = {
        background: 'url(https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/fl4bzxx2pvifrjtc4l6x) no-repeat center center / cover'
    }

    if (!props.profile) {
        return <Preloader />
    }

    return (
    <div>
        <div className={s.background} style={background}></div>
        <div className={s.avaAndName}>
            <div className={s.avatar} style={{background: `url(${props.profile.photos.large}) no-repeat center center / cover`}}>
                <div className={s.status}></div>
            </div>
            <p className={s.name}>{props.profile.fullName}</p>
            <div className={s.contacts}>

            </div>
        </div>
        <div className={s.description}>
            <p>About me: <span>{props.profile.aboutMe}</span></p>

        </div>
    </div>
    );
}
