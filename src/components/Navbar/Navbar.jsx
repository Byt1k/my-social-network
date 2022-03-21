import s from './Navbar.module.css';
import React from "react";
import {NavLink} from "react-router-dom";
import FriendsContainer from "./Friends/FriendsContainer";

const Navbar = props => {
    const isActiveLink = navData => navData.isActive ? `${s.item} ${s.active}` : s.item;
    return (
        <div className={s.navbar}>
            <div className={s.menu}>
                <NavLink to="/profile" className={isActiveLink}>My profile</NavLink>
                <NavLink to="/dialogs" className={isActiveLink} activeClassName={s.active}>Message</NavLink>
                <NavLink to="/users" className={isActiveLink} activeClassName={s.active}>Users</NavLink>
                <a href="#" className={s.item}>News</a>
                <a href="#" className={s.item}>Music</a>
                <a href="#" className={s.item}>Settings</a>
            </div>
            <FriendsContainer />
        </div >
    );
}

export default Navbar;