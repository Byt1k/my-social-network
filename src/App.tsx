import './zeroing.css'
import './App.css'
import {FC, useEffect} from "react"
import {connect, Provider} from "react-redux"
import Preloader from "./components/common/Preloader/Preloader"
import {initializeApp} from "./redux/app-reducer"
import store, {GlobalStateType} from "./redux/redux-store"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

const App: FC<PropsType> = ({initialized, initializeApp}) => {

    useEffect(() => initializeApp(), [])

    if (!initialized) {
        return <div className="startAppPreloader">
            <Preloader/>
        </div>
    }

    return (
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='*' element={<Home />}/>
        </Routes>
    )
}

const mapStateToProps = (state: GlobalStateType) => ({
    initialized: state.app.initialized,
})

const AppConnected = connect(mapStateToProps,
    {initializeApp})(App);

const AppContainer: FC = () => {
    return (
        // BrowserRouter should be used
        // HashRouter used only of deploy on GitHub Pages
        <BrowserRouter>
            <Provider store={store}>
                <AppConnected/>
            </Provider>
        </BrowserRouter>
    )
}

export default AppContainer


type PropsType = {
    initialized: boolean
    initializeApp: () => void
}