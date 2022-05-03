import './zeroing.css'
import './App.css'
import {FC, useEffect} from "react"
import {Provider, useDispatch, useSelector} from "react-redux"
import Preloader from "./components/common/Preloader/Preloader"
import {initializeApp} from "./redux/app-reducer"
import store from "./redux/redux-store"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./components/Home/Home"
import {Login} from "./components/Login/Login"
import {getInitialized} from "./redux/selectors/app-selectors"

const App: FC = () => {
    const dispatch = useDispatch()
    const initialized = useSelector(getInitialized)

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!initialized) {
        return <div className="startAppPreloader">
            <Preloader/>
        </div>
    }

    return (
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='*' element={<Home/>}/>
        </Routes>
    )
}

export const AppContainer: FC = () => {
    return (
        // BrowserRouter should be used
        // HashRouter used only of deploy on GitHub Pages
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    )
}