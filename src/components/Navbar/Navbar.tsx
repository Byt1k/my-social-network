// @ts-ignore
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom"
import Friends from "./Friends/Friends"

const Navbar = () => {
    const isActiveLink = (navData: any) => navData.isActive ? `${s.item} ${s.active}` : s.item;
    return (
        <div className={s.navbar}>
            <div className={s.menu}>
                <NavLink to="/profile" className={isActiveLink}>My profile</NavLink>
                <NavLink to="/dialogs" className={isActiveLink}>Message</NavLink>
                <NavLink to="/users" className={isActiveLink}>Users</NavLink>
                <a href="#" className={s.item}>News</a>
                <a href="#" className={s.item}>Music</a>
                <a href="#" className={s.item}>Settings</a>
            </div>
            <Friends />
        </div >
    )
}

export default Navbar