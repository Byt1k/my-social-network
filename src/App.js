import './zeroing.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from './components/Users/UsersContainer'
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

function App(props) {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <HeaderContainer />
                <div className="container">
                    <Navbar />
                    <div className="content">
                        <Route path='/profile/:userID?' render={() => <ProfileContainer />} />
                        <Route path='/dialogs' render={() => <DialogsContainer />} />
                        <Route path='/users' render={() => <UsersContainer />} />
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
