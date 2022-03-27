import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import defaultImage from '../../../assets/images/user.jpg';
import UserStatus from "./UserStatus/UserStatus";
import editProfileBtn from '../../../assets/images/eidtProfileBtn.png'

export const ProfileInfo = ({profile, userStatus, updateUserStatus, isOwner, ...props}) => {
    const background = {
        background: 'url(https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/fl4bzxx2pvifrjtc4l6x) no-repeat center center / cover'
    }

    // проверка для отображения заголовка "Контакты"
    let contactsExist = Object.keys(profile.contacts).some(key => profile.contacts[key] !== null);

    return (
        <div>
            <div className={s.background} style={background}></div>
            <div className={s.avaAndName}>
                <div className={s.avatar} style={{background: `url(${profile.photos.large || defaultImage}) no-repeat center center / cover`}}>
                    {profile.lookingForAJob && <div className={s.isOpenToWork} title={profile.lookingForAJobDescription}>#OpenToWork</div>}
                    <div className={s.uploadAvatarWrapper}>
                        {isOwner && <div className={s.uploadAvatar} onClick={() => props.setPhotoUploadMode(true)}>Upload photo</div>}
                    </div>
                    {/*{isOwner && <input type="file" onChange={savePhoto}/>}*/}
                </div>
                <div className={s.nameAndStatus}>
                    <div className={s.nameContainer}>
                        <p className={s.name}>{profile.fullName}</p>
                        {/*Редактирование профиля*/}
                        {isOwner && <img onClick={props.setEditModeProfileData} src={editProfileBtn} alt="icon" className={s.editProfileBtn}/>}
                    </div>
                    <UserStatus userStatus={userStatus} updateUserStatus={updateUserStatus} isOwner={isOwner}/>
                </div>
            </div>
            <div className={s.description}>
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
