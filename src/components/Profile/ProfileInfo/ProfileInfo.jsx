import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import defaultImage from '../../../assets/images/user.jpg';
import UserStatus from './UserStatus'

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
            <div className={s.avatar} style={{background: `url(${props.profile.photos.large ? props.profile.photos.large : defaultImage}) no-repeat center center / cover`}}>
                {props.profile.lookingForAJob ? <div className={s.isOpenToWork} title={props.profile.lookingForAJobDescription}>#OpenToWork</div> : null}
            </div>
            <div>
                <p className={s.name}>{props.profile.fullName}</p>
                <UserStatus userStatus={props.userStatus} />
            </div>
        </div>
        <div className={s.description}>
            <p>About me: <span>{props.profile.aboutMe}</span></p>
            <div className={s.contacts}>
                <p className={s.title}>Contacts</p>
                <div>
                    {props.profile.contacts.facebook ? <p>Facebook: <span>{props.profile.contacts.facebook}</span></p> : null}
                    {props.profile.contacts.website ?  <p>Website: <span>{props.profile.contacts.website}</span></p> : null}
                    {props.profile.contacts.vk ? <p>VK: <span>{props.profile.contacts.vk}</span></p> : null}
                    {props.profile.contacts.twitter ? <p>Twitter: <span>{props.profile.contacts.twitter}</span></p> : null}
                    {props.profile.contacts.instagram ? <p>Instagram: <span>{props.profile.contacts.instagram}</span></p> : null}
                    {props.profile.contacts.github ? <p>GitHub: <span>{props.profile.contacts.github}</span></p> : null}
                    {props.profile.contacts.mainLink ? <p>Main link: <span>{props.profile.contacts.mainLink}</span></p> : null}
                </div>
            </div>
        </div>
    </div>
    );
}
