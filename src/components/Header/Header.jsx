import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = props => {
    debugger
    return (
        <div className={s.header}>
            <div className={s.logo}>
                <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" alt="logo" />
            </div>
            <div className={s.auth}>
                {props.isAuth ? props.login : <NavLink to={'/login'}>Sign In</NavLink>}
            </div>
        </div>
    );
}

export default Header;