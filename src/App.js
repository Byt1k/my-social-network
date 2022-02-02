import './zeroing.css';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";

function App(props) {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header/>
                <div className="container">
                    <Navbar state={props.state.navbar}/>
                    <div className="content">
                        <Routes>
                            <Route path='/profile' element={<Profile
                                state={props.state.profilePage}
                                addPost={props.addPost}
                                updateNewPostText={props.updateNewPostText}
                            />} />
                            <Route path='/dialogs/*' element={<Dialogs state={props.state.dialogsPage}/>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
