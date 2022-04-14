import Header from "./Header/Header"
import Navbar from "./Navbar/Navbar"
import ProfileContainer from "./Profile/ProfileContainer"
import DialogsContainer from "./Dialogs/DialogsContainer"
import UsersContainer from "./Users/UsersContainer"
import Modal from "../common/Modal/Modal"
import ProfileEditDataForm from "./Profile/ProfileInfo/ProfileEditDataForm/ProfileEditDataForm"
import UploadAvatarForm from "./Profile/ProfileInfo/UploadAvatarForm/UploadAvatarForm"
import ErrorModal from "../common/ErrorModal/ErrorModal"
import {Navigate, Route, Routes} from "react-router-dom"
import {ChangeEvent, FC, useEffect, useState} from "react"
import {ProfileType, UserType} from "../../types/types"
import {GlobalStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {updateMainPhoto, updateProfileData} from "../../redux/profile-reducer";
import {actionsApp} from "../../redux/app-reducer";
import {getFriendsToNavbar} from "../../redux/navbar-reducer";

const Home: FC<PropsType> = props => {
    useEffect(() => {
        props.getFriendsToNavbar()
    }, [])

    // редактирование профиля
    let [editModeProfileData, setEditModeProfileData] = useState(false);
    const saveProfileData = (profileData: ProfileType) => {
        props.updateProfileData(profileData).then(() => setEditModeProfileData(false))
    }

    // загрузка аватара
    let [photoUploadMode, setPhotoUploadMode] = useState(false);
    const saveMainPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.updateMainPhoto(e.target.files[0])
        }
        setPhotoUploadMode(false);
    }

    return (
        <div className="wrapper">
            <Header />
            <div className="container">
                <Navbar friends={props.friends} />
                <div className="content">
                    <Routes>
                        <Route path='/' element={<Navigate to='/profile' />}/>
                        <Route path='/profile/:userId'
                               element={<ProfileContainer />} />
                        <Route path='/profile'
                               element={<ProfileContainer setEditModeProfileData={setEditModeProfileData}
                                                          setPhotoUploadMode={setPhotoUploadMode} />} />
                        <Route path='/dialogs/*' element={<DialogsContainer />}/>
                        <Route path='/users' element={<UsersContainer />}/>
                        <Route path='/friends' element={<UsersContainer isFriends={true} />}/>
                    </Routes>
                </div>
            </div>
            {/* Модальное окно редактирования профиля*/}
            <Modal active={editModeProfileData} setActive={setEditModeProfileData}>
                {/* @ts-ignore */}
                <ProfileEditDataForm initialValues={props.profile} onSubmit={saveProfileData}/>
            </Modal>
            {/* Модальное окно загрузки аватара */}
            <Modal active={photoUploadMode} setActive={setPhotoUploadMode}>
                <UploadAvatarForm updateMainPhoto={saveMainPhoto}/>
            </Modal>
            {/* Модальное окно ошибки */}
            <ErrorModal errorMessage={props.errorMessage} active={!!props.errorMessage}
                        hideModal={props.setErrorMessage}/>
        </div>
    )
}

const mapStateProps = (state: GlobalStateType) => ({
    authorizedUserId: state.auth.userId,
    profile: state.profilePage.profile,
    errorMessage: state.app.errorMessage,
    isAuth: state.auth.isAuth,
    friends: state.navbar.friends
})

export default connect<MapStatePropsType, MapDispatchPropsType, {}, GlobalStateType>(mapStateProps, {
    updateProfileData,
    updateMainPhoto,
    setErrorMessage: actionsApp.setErrorMessage,
    getFriendsToNavbar
})(Home)


type MapStatePropsType = {
    authorizedUserId: number | null
    profile: ProfileType | null
    errorMessage: string | null
    isAuth: boolean
    friends: UserType[]
}

type MapDispatchPropsType = {
    updateProfileData: Function
    updateMainPhoto: Function
    setErrorMessage: (errorMessage: string | null) => void
    getFriendsToNavbar: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType