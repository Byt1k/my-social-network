import './zeroing.css'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import {Routes, Route, Navigate} from "react-router"
import Login from "./components/Login/Login"
import Header from "./components/Header/Header"
import ProfileContainer from "./components/Profile/ProfileContainer"
import DialogsContainer from "./components/Dialogs/DialogsContainer"
import UsersContainer from './components/Users/UsersContainer'
import {ChangeEvent, FC, HTMLInputTypeAttribute, useEffect, useState} from "react"
import {connect, Provider} from "react-redux"
import Preloader from "./components/common/Preloader/Preloader"
import {initializeApp, setErrorMessage} from "./redux/app-reducer"
import store, {GlobalStateType} from "./redux/redux-store"
import {BrowserRouter} from "react-router-dom"
import Modal from "./components/common/Modal/Modal"
import ProfileEditDataForm from "./components/Profile/ProfileInfo/ProfileEditDataForm/ProfileEditDataForm"
import {updateMainPhoto, updateProfileData} from "./redux/profile-reducer"
import UploadAvatarForm from "./components/Profile/ProfileInfo/UploadAvatarForm/UploadAvatarForm"
import ErrorModal from "./components/common/ErrorModal/ErrorModal"
import {ProfileType} from "./types/types"
import {AxiosPromise} from "axios"

type MapStatePropsType = {
    initialized: boolean
    isAuth: boolean
    authorizedUserId: number
    profile : ProfileType
    errorMessage: string | null
}

type MapDispatchPropsType = {
    initializeApp: () => void
    updateProfileData: (profileData: ProfileType) => AxiosPromise
    updateMainPhoto: (photo: string) => void
    setErrorMessage: (errorMessage: string | null) => void
}

type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const App:FC<PropsType> = props => {
    useEffect(() => props.initializeApp())

    // редактирование профиля
    let [editModeProfileData, setEditModeProfileData] = useState(false);
    const saveProfileData = (profileData: ProfileType) => {
        props.updateProfileData(profileData).then(() => setEditModeProfileData(false))
    }

    // загрузка аватара
    let [photoUploadMode, setPhotoUploadMode] = useState(false);
    const saveMainPhoto = (e) => {
        props.updateMainPhoto(e.target.files[0]);
        setPhotoUploadMode(false);
    }

    if (!props.initialized) {
        return (
            <div className="startAppPreloader">
                <Preloader/>
            </div>
        )
    }

    if (!props.isAuth) {
        return <div className="startAppPreloader">
            <Login />;
        </div>
    }

    return (
        <div className="wrapper">
            <Header />
            <div className="container">
                <Navbar authorizedUserId={props.authorizedUserId}/>
                <div className="content">
                    <Routes>
                        <Route path='/' element={<Navigate to='/profile'/>}/>
                        <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                        <Route path='/profile'
                               element={<ProfileContainer setEditModeProfileData={setEditModeProfileData}
                                                          setPhotoUploadMode={setPhotoUploadMode}/>}/>
                        <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                        <Route path='/users' element={<UsersContainer/>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>
                </div>
            </div>
            {/* Модальное окно редактирования профиля*/}
            <Modal active={editModeProfileData} setActive={setEditModeProfileData}>
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
    );
}

let mapStateToProps = (state: GlobalStateType): MapStatePropsType => ({
    initialized: state.app.initialized,
    authorizedUserId: state.auth.userId,
    profile: state.profilePage.profile,
    errorMessage: state.app.errorMessage,
    isAuth: state.auth.isAuth
})

const AppConnected = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, GlobalStateType>(mapStateToProps, {
    initializeApp,
    updateProfileData,
    updateMainPhoto,
    setErrorMessage
})(App);

const AppContainer = props => {
    return (
        // BrowserRouter should be used
        // HashRouter used only of deploy on GitHub Pages
        <BrowserRouter>
            <Provider store={store}>
                <AppConnected />
            </Provider>
        </BrowserRouter>
    )
}

export default AppContainer;