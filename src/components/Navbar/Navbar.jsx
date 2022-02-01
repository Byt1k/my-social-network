import s from './Navbar.module.css';
import Menu from './Menu/Menu';
import Friends from './Friends/Friends';
import React from "react";

const Navbar = props => {
    return (
        <div className={s.navbar}>
            <Menu />
            <Friends friends={props.state.friends}/>
        </div >
    );
}

export default Navbar;