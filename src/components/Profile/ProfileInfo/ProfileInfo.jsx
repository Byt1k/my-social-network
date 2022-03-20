import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import defaultImage from '../../../assets/images/user.jpg';
import UserStatus from './UserStatus'
import UserStatusWithHooks from "./UserStatusWithHooks";

export const ProfileInfo = ({profile, userStatus, updateUserStatus, ...props}) => {
    const background = {
        background: 'url(https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/fl4bzxx2pvifrjtc4l6x) no-repeat center center / cover'
    }

    if (!profile) {
        return <Preloader />
    }

    return (
    <div>
        <div className={s.background} style={background}></div>
        <div className={s.avaAndName}>
            <div className={s.avatar} style={{background: `url(${profile.photos.large ? profile.photos.large : defaultImage}) no-repeat center center / cover`}}>
                {profile.lookingForAJob ? <div className={s.isOpenToWork} title={profile.lookingForAJobDescription}>#OpenToWork</div> : null}
            </div>
            <div className={s.nameAndStatus}>
                <p className={s.name}>{profile.fullName}</p>
                <UserStatusWithHooks userStatus={userStatus} updateUserStatus={updateUserStatus} />
            </div>
        </div>
        <div className={s.description}>
            <p>About me: <span>{profile.aboutMe}</span></p>
            <div className={s.contacts}>
                <p className={s.title}>Contacts</p>
                <div>
                    {profile.contacts.facebook ? <p>Facebook: <span>{profile.contacts.facebook}</span></p> : null}
                    {profile.contacts.website ?  <p>Website: <span>{profile.contacts.website}</span></p> : null}
                    {profile.contacts.vk ? <p>VK: <span>{profile.contacts.vk}</span></p> : null}
                    {profile.contacts.twitter ? <p>Twitter: <span>{profile.contacts.twitter}</span></p> : null}
                    {profile.contacts.instagram ? <p>Instagram: <span>{profile.contacts.instagram}</span></p> : null}
                    {profile.contacts.github ? <p>GitHub: <span>{profile.contacts.github}</span></p> : null}
                    {profile.contacts.mainLink ? <p>Main link: <span>{profile.contacts.mainLink}</span></p> : null}
                </div>
            </div>
        </div>
    </div>
    );
}
