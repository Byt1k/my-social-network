// @ts-ignore
import s from "./ProfileInfo.module.css"
// @ts-ignore
import defaultImage from '../../../assets/images/user.jpg'
import UserStatus from "./UserStatus/UserStatus"
// @ts-ignore
import editProfileBtn from '../../../assets/images/eidtProfileBtn.png'
import {FC} from "react"
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
    userStatus: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    setEditModeProfileData: (editModeProfileData: boolean) => void
    setPhotoUploadMode: (photoUploadMode: boolean) => void
}

export const ProfileInfo: FC<PropsType> = ({
                                               profile,
                                               userStatus,
                                               updateUserStatus,
                                               isOwner,
                                               setPhotoUploadMode,
                                               setEditModeProfileData
                                           }) => {
    const background = {
        background: 'url(https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/fl4bzxx2pvifrjtc4l6x) no-repeat center center / cover'
    }

    // проверка для отображения заголовка "Контакты"
    let contactsExist = Object.keys(profile.contacts).some(key => profile.contacts[key] !== null);

    return (
        <div>
            <div className={s.background} style={background}></div>
            <div className={s.avaAndName}>
                <div className={s.avatar}
                     style={{background: `url(${profile.photos.large || defaultImage}) no-repeat center center / cover`}}>
                    {profile.lookingForAJob &&
                        <div className={s.isOpenToWork} title={profile.lookingForAJobDescription}>#OpenToWork</div>}
                    <div className={s.uploadAvatarWrapper}>
                        {isOwner &&
                            <div className={s.uploadAvatar} onClick={() => setPhotoUploadMode(true)}>Upload
                                photo</div>}
                    </div>
                </div>
                <div className={s.nameAndStatus}>
                    <div className={s.nameContainer}>
                        <p className={s.name}>{profile.fullName}</p>
                        {isOwner && <img onClick={() => setEditModeProfileData(true)}
                                         src={editProfileBtn} alt="icon" className={s.editProfileBtn}/>}
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
                            return <ContactItem key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

const ContactItem = ({contactTitle, contactValue}) => {
    return (
        <div>
            {contactValue && <p>{contactTitle}: <span>{contactValue}</span></p>}
        </div>
    )
}
