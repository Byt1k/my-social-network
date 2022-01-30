import './zeroing.css';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";


function App() {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header/>
                <div className="container">
                    <Navbar/>
                    <div className="content">
                        <Routes>
                            <Route path='/profile' element={<Profile />} />
                            <Route path='/dialogs' element={<Dialogs />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
