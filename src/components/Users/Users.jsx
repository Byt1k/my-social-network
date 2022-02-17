import s from "./Users.module.css";
import React from "react";
import defaultImage from '../../assets/images/user.jpg'
import {NavLink} from "react-router-dom";
import * as axios from "axios";

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
                                <button className={u.followed ? `${s.followBtn} ${s.followed}` : s.followBtn}
                                        onClick={() => {
                                            !u.followed ?
                                                axios
                                                    .post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{},{
                                                        withCredentials: true,
                                                        headers: {
                                                            'API-KEY': 'ebbe01eb-c053-4a58-8607-a075b006cd68'
                                                        }
                                                        },
                                                    )
                                                    .then(response => {
                                                        if (response.data.resultCode === 0) {
                                                            props.toggleFollow(u.id);
                                                        }
                                                    }):
                                                axios
                                                    .delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                                        withCredentials: true,
                                                        headers: {
                                                            'API-KEY': 'ebbe01eb-c053-4a58-8607-a075b006cd68'
                                                        }
                                                    })
                                                    .then(response => {
                                                        if (response.data.resultCode === 0) {
                                                            props.toggleFollow(u.id);
                                                        }
                                                    })
                                        }}>
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