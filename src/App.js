import './zeroing.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Routes, Route} from "react-router";

// const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
// const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
// const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
// const HeaderContainer = React.lazy(() => import('./components/Header/HeaderContainer'));


import Login from "./components/Login/Login";
import HeaderContainer from "./components/Header/HeaderContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from './components/Users/UsersContainer'

import React, {Component, Suspense} from "react";
import {connect, Provider} from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import {initializeApp} from "./redux/app-reducer";
import store from "./redux/redux-store";
import {BrowserRouter, HashRouter} from "react-router-dom";

class AppContainer extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }
    render() {
        if (!this.props.initialized) {
            return (
                <div className="startAppPreloader">
                    <Preloader />
                </div>
            )
        }
        return (
            <div className="wrapper">
                <HeaderContainer/>
                <div className="container">
                    <Navbar authorizedUserId={this.props.authorizedUserId}/>
                    <div className="content">
                        <Routes>
                            <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                            <Route path='/profile' element={<ProfileContainer/>}/>
                            <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                            <Route path='/users' element={<UsersContainer/>}/>
                            <Route path='/login' element={<Login/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = state => ({
    initialized: state.app.initialized,
    authorizedUserId: state.auth.userId
})

AppContainer = connect(mapStateToProps, {initializeApp})(AppContainer);

const App = props => {
    return (
        // BrowserRouter should be used
        // HashRouter used only of deploy on GitHub Pages
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default App;