import s from './Header.module.css'
import {NavLink} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {logout} from "../../../redux/auth-reducer"
import {FC} from "react"
import {getIsAuth, getLogin} from "../../../redux/selectors/auth-selectors";

export const Header:FC = () => {

    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getLogin)

    const dispatch = useDispatch()

    const signOut = () => {
        dispatch(logout())
    }

    return (
        <div className={s.header}>
            <div className={s.logo}>
                <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" alt="logo" />
            </div>
            <div className={s.auth}>
                {isAuth ?
                    <div>{login} | <button className={s.logoutBtn} onClick={signOut}>Log out</button></div> :
                    <NavLink to={'/login'}>Sign In</NavLink>}
            </div>
        </div>
    )
}
