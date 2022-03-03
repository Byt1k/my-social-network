import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = props => {
    return (
        <div className={s.header}>
            <div className={s.logo}>
                <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" alt="logo" />
            </div>
            <div className={s.auth}>
                {props.isAuth ? <div>{props.login} | <button className={s.logoutBtn} onClick={props.logout}>Log out</button></div> : <NavLink to={'/login'}>Sign In</NavLink>}
            </div>
        </div>
    );
}

export default Header;