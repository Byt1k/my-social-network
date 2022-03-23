import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import defaultImage from '../../../assets/images/user.jpg';
import UserStatus from "./UserStatus/UserStatus";

export const ProfileInfo = ({profile, userStatus, updateUserStatus, isOwner, updateMainPhoto, ...props}) => {
    const background = {
        background: 'url(https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/fl4bzxx2pvifrjtc4l6x) no-repeat center center / cover'
    }

    if (!profile) {
        return <Preloader/>
    }

    // проверка для отображения заголовка "Контакты"
    let contactsExist = Object.keys(profile.contacts).some(key => profile.contacts[key] !== null);

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
                    <UserStatus userStatus={userStatus} updateUserStatus={updateUserStatus} isOwner={isOwner}/>
                </div>
            </div>
            <div className={s.description}>
                {/* Стилизовать редактирование профиля */}
                {isOwner && <div style={{marginBottom: '20px'}}><button onClick={props.setEditModeProfileData}>Edit profile</button></div>}
                {profile.aboutMe && <p>About me: <span>{profile.aboutMe}</span></p>}
                <div className={s.contacts}>
                    {contactsExist && <p className={s.title}>Contacts</p>}
                    <div>
                        {Object.keys(profile.contacts).map(key => {
                            return <ContactItem key={key} contactTitle={key} ContactValue={profile.contacts[key]}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

const ContactItem = ({contactTitle, ContactValue}) => {
    return (
        <div>
            {ContactValue && <p>{contactTitle}: <span>{ContactValue}</span></p>}
        </div>
    )
}
