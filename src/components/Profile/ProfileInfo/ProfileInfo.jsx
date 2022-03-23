import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import defaultImage from '../../../assets/images/user.jpg';
import UserStatusWithHooks from "./UserStatusWithHooks";

export const ProfileInfo = ({profile, userStatus, updateUserStatus, isOwner, updateMainPhoto}) => {
    const background = {
        background: 'url(https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/fl4bzxx2pvifrjtc4l6x) no-repeat center center / cover'
    }

    if (!profile) {
        return <Preloader/>
    }

    // проверка для отображения заголовка "Контакты"
    let valuesProfileContacts = [];
    for (let item in profile.contacts) {
        valuesProfileContacts.push(profile.contacts[item]);
    }
    let contactsExist = valuesProfileContacts.some(item => item !== null);

    // загрузка фото
    const savePhoto = e => {
        updateMainPhoto(e.target.files[0]);
    }

    return (
        <div>
            <div className={s.background} style={background}></div>
            <div className={s.avaAndName}>
                <div className={s.avatar}
                     style={{background: `url(${profile.photos.large || defaultImage}) no-repeat center center / cover`}}>
                    {profile.lookingForAJob &&
                    <div className={s.isOpenToWork} title={profile.lookingForAJobDescription}>#OpenToWork</div>}
                    {/* Стилизовать загрузку фото */}
                    {isOwner && <input type="file" onChange={savePhoto}/>}
                </div>
                <div className={s.nameAndStatus}>
                    <p className={s.name}>{profile.fullName}</p>
                    <UserStatusWithHooks userStatus={userStatus} updateUserStatus={updateUserStatus} isOwner={isOwner}/>
                </div>
            </div>
            <div className={s.description}>
                {profile.aboutMe && <p>About me: <span>{profile.aboutMe}</span></p>}
                <div className={s.contacts}>
                    {contactsExist && <p className={s.title}>Contacts</p>}
                    <div>
                        {profile.contacts.facebook && <p>Facebook: <span>{profile.contacts.facebook}</span></p>}
                        {profile.contacts.website && <p>Website: <span>{profile.contacts.website}</span></p>}
                        {profile.contacts.vk && <p>VK: <span>{profile.contacts.vk}</span></p>}
                        {profile.contacts.twitter && <p>Twitter: <span>{profile.contacts.twitter}</span></p>}
                        {profile.contacts.instagram && <p>Instagram: <span>{profile.contacts.instagram}</span></p>}
                        {profile.contacts.youtube && <p>YouTube: <span>{profile.contacts.youtube}</span></p>}
                        {profile.contacts.github && <p>GitHub: <span>{profile.contacts.github}</span></p>}
                        {profile.contacts.mainLink && <p>Main link: <span>{profile.contacts.mainLink}</span></p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
