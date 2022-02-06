import s from './Navbar.module.css';
import React from "react";
import {NavLink} from "react-router-dom";
import FriendsContainer from "./Friends/FriendsContainer";

const Navbar = props => {
    return (
        <div className={s.navbar}>
            <ul className={s.menu}>
                <li>
                    <NavLink to="/profile" className={navData => navData.isActive ? `${s.item} ${s.active}` : s.item}>My profile</NavLink>
                </li>
                <li>
                    <NavLink to="/dialogs" className={navData => navData.isActive ?`${s.item} ${s.active}` : s.item}>Message</NavLink>
                </li>
                <li><a href="#" className={s.item}>News</a></li>
                <li><a href="#" className={s.item}>Music</a></li>
                <li><a href="#" className={s.item}>Settings</a></li>
            </ul>
            <FriendsContainer />
        </div >
    );
}

export default Navbar;