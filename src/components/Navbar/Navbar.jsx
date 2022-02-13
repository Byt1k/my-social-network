import s from './Navbar.module.css';
import React from "react";
import {NavLink} from "react-router-dom";
import FriendsContainer from "./Friends/FriendsContainer";

const Navbar = props => {
    return (
        <div className={s.navbar}>
            <div className={s.menu}>
                <NavLink to="/profile" className={navData => navData.isActive ? `${s.item} ${s.active}` : s.item}>My profile</NavLink>
                <NavLink to="/dialogs" className={navData => navData.isActive ?`${s.item} ${s.active}` : s.item}>Message</NavLink>
                <NavLink to="/users" className={navData => navData.isActive ?`${s.item} ${s.active}` : s.item}>Users</NavLink>
                <a href="#" className={s.item}>News</a>
                <a href="#" className={s.item}>Music</a>
                <a href="#" className={s.item}>Settings</a>
            </div>
            <FriendsContainer />
        </div >
    );
}

export default Navbar;