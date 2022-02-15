import './zeroing.css';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from './components/Users/UsersContainer'
import ProfileContainer from "./components/Profile/ProfileContainer";

function App(props) {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header />
                <div className="container">
                    <Navbar />
                    <div className="content">
                        <Routes>
                            <Route path='/profile/*' element={<ProfileContainer />} />
                            <Route path='/dialogs/*' element={<DialogsContainer />} />
                            <Route path='/users' element={<UsersContainer />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
