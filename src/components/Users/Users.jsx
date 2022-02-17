import s from "./Users.module.css";
import React from "react";
import defaultImage from '../../assets/images/user.jpg'
import {NavLink} from "react-router-dom";
import {followingAPI} from "../../api/api";

const Users = props => {
    let pageCount = Math.ceil(props.totalCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            {
                props.users.map(u => {
                    let followingClick = button => {
                        // props.toggleFollowingInProgress(true, u.id);
                        button.disabled = true;
                        !u.followed ?
                            followingAPI.follow(u.id)
                                .then(data => {
                                    if (data.resultCode === 0) {
                                        props.toggleFollow(u.id);
                                    }
                                    // props.toggleFollowingInProgress(false, u.id);
                                    button.disabled = false;
                                }) :
                            followingAPI.unfollow(u.id)
                                .then(data => {
                                    if (data.resultCode === 0) {
                                        props.toggleFollow(u.id);
                                    }
                                    // props.toggleFollowingInProgress(false, u.id);
                                    button.disabled = false;
                                })
                    }

                    return (
                        <div key={u.id} className={s.item}>
                            <div>
                                <NavLink to={'/profile/' + u.id}>
                                    <div className={s.avatar}
                                         style={{background: `url(${u.photos.small ? u.photos.small : defaultImage}) no-repeat center center / cover`}}></div>
                                </NavLink>
                            </div>
                            <div>
                                <p className={s.name}>{u.name}</p>
                                <p className={s.status}>{u.status}</p>
                                <button disabled={props.followingInProgress.some(id => id === u.id)} className={u.followed ? `${s.followBtn} ${s.followed}` : s.followBtn}
                                        onClick={(e) => followingClick(e.target)}>
                                    {u.followed ? 'Unfollow' : 'Follow'}
                                </button>
                            </div>
                        </div>
                    )
                })
            }
            <div className={s.pagination}>
                {
                    pages.map(p => {
                        return <button onClick={() => props.onChangePage(p)} key={p}
                                       className={props.currentPage === p ? s.active : ''}>{p}</button>
                    })
                }
            </div>
        </div>
    )
}

export default Users;