import {Header} from "./Header/Header"
import Navbar from "./Navbar/Navbar"
import {DialogsPage} from "./Dialogs/DialogsPage"
import Modal from "../common/Modal/Modal"
import ProfileEditDataForm from "./Profile/ProfileInfo/ProfileEditDataForm/ProfileEditDataForm"
import UploadAvatarForm from "./Profile/ProfileInfo/UploadAvatarForm/UploadAvatarForm"
import ErrorModal from "../common/ErrorModal/ErrorModal"
import {Navigate, Route, Routes} from "react-router-dom"
import {ChangeEvent, FC, useEffect, useState} from "react"
import {ProfileType} from "../../types/types"
import {useDispatch, useSelector} from "react-redux";
import {updateMainPhoto, updateProfileData} from "../../redux/profile-reducer";
import {actionsApp} from "../../redux/app-reducer";
import {getFriendsToNavbar} from "../../redux/navbar-reducer";
import {Users} from "./Users/Users";
import {ProfilePage} from "./Profile/Profile";
import {getErrorMessage} from "../../redux/selectors/app-selectors";
import {getProfilePageData} from "../../redux/selectors/profile-selectors";
import {GeneralChat} from "./GeneralChat/GeneralChat";

export const Home: FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFriendsToNavbar())
    }, [])

    const errorMessage = useSelector(getErrorMessage)
    const {profile} = useSelector(getProfilePageData)

    // редактирование профиля
    let [editModeProfileData, setEditModeProfileData] = useState(false);
    const saveProfileData = async (profileData: ProfileType) => {
        await dispatch(updateProfileData(profileData))
        setEditModeProfileData(false)
    }

    // загрузка аватара
    let [photoUploadMode, setPhotoUploadMode] = useState(false);
    const saveMainPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(updateMainPhoto(e.target.files[0]))
        }
        setPhotoUploadMode(false)
    }

    const setErrorMessage = (errorMessage: string | null) => {
        dispatch(actionsApp.setErrorMessage(errorMessage))
    }

    return (
        <div className="wrapper">
            <Header />
            <div className="container">
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path='/' element={<Navigate to='/profile' />}/>
                        <Route path='/profile/:userId'
                               element={<ProfilePage />} />
                        <Route path='/profile'
                               element={<ProfilePage setEditModeProfileData={setEditModeProfileData}
                                                          setPhotoUploadMode={setPhotoUploadMode} />} />
                        <Route path='/dialogs/*' element={<DialogsPage />}/>
                        <Route path='/users' element={<Users />}/>
                        <Route path='/friends' element={<Users isFriends={true} />}/>
                        <Route path='/chat' element={<GeneralChat />}/>
                    </Routes>
                </div>
            </div>
            {/* Модальное окно редактирования профиля*/}
            <Modal active={editModeProfileData} setActive={setEditModeProfileData}>
                {/* @ts-ignore */}
                <ProfileEditDataForm initialValues={profile} onSubmit={saveProfileData}/>
            </Modal>
            {/* Модальное окно загрузки аватара */}
            <Modal active={photoUploadMode} setActive={setPhotoUploadMode}>
                <UploadAvatarForm updateMainPhoto={saveMainPhoto}/>
            </Modal>
            {/* Модальное окно ошибки */}
            <ErrorModal errorMessage={errorMessage} active={!!errorMessage}
                        hideModal={setErrorMessage}/>
        </div>
    )
}