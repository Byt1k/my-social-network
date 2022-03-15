import './zeroing.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from './components/Users/UsersContainer'
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {Component} from "react";
import {connect} from "react-redux";
import {getAuthUserData} from "./redux/auth-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {initializeApp} from "./redux/app-reducer";

class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <BrowserRouter>
                <div className="wrapper">
                    <HeaderContainer/>
                    <div className="container">
                        <Navbar/>
                        <div className="content">
                            <Route path='/profile/:userID?' render={() => <ProfileContainer/>}/>
                            <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                            <Route path='/users' render={() => <UsersContainer/>}/>
                            <Route path='/login' render={() => <Login/>}/>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

let mapStateToProps = state => ({
    initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App);
