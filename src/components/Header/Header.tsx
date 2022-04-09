// @ts-ignore
import s from './Header.module.css'
import {NavLink} from "react-router-dom"
import {GlobalStateType} from "../../redux/redux-store"
import {connect} from "react-redux"
import {logout} from "../../redux/auth-reducer"
import {FC} from "react"

type PropsType = {
    isAuth: boolean
    login: string
    logout: () => void
}

const Header:FC<PropsType> = ({isAuth, login, logout}) => {
    return (
        <div className={s.header}>
            <div className={s.logo}>
                <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" alt="logo" />
            </div>
            <div className={s.auth}>
                {isAuth ?
                    <div>{login} | <button className={s.logoutBtn} onClick={logout}>Log out</button></div> :
                    <NavLink to={'/login'}>Sign In</NavLink>}
            </div>
        </div>
    )
}

let mapStateToProps = (state: GlobalStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {logout})(Header)