import s from "../Users.module.css";
import {NavLink} from "react-router-dom";
import defaultImage from "../../../assets/images/user.jpg";
import React from "react";

const UsersItem = ({user, followingInProgress, follow, unfollow}) => {
    let followingClick = () => !user.followed ? follow(user.id) : unfollow(user.id);
    return (
        <div className={s.item}>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <div className={s.avatar}
                         style={{background: `url(${user.photos.small ? user.photos.small : defaultImage}) no-repeat center center / cover`}}></div>
                </NavLink>
            </div>
            <div>
                <p className={s.name}>{user.name}</p>
                <p className={s.status}>{user.status}</p>
                <button disabled={followingInProgress.some(id => id === user.id)}
                        className={user.followed ? `${s.followBtn} ${s.followed}` : s.followBtn}
                        onClick={(e) => followingClick(e.target)}>
                    {user.followed ? 'Unfollow' : 'Follow'}
                </button>
            </div>
        </div>
    )
}

export default UsersItem;
