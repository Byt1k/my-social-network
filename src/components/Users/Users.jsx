import React from "react";
import s from './Users.module.css'
import * as axios from 'axios';
import defaultImage from '../../assets/images/user.png'

const Users = props => {
   if(!props.users.length) {
       axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => props.setUsers(response.data.items));
    }

    let users = props.users.map(u =>  {
        return (
            <div key={u.id}>
                <div>
                    <img src={u.photos.small ? u.photos.small : defaultImage} className={s.avatar}/>
                </div>
                <div>
                    <p>{u.name}</p>
                    <p>{`${'u.location.city'}, ${'u.location.country'}`}</p>
                    <button onClick={() => props.toggleFollow(u.id)}>
                        {u.followed ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
            </div>
        )
    })

    return <div>{users}</div>
}

export default Users;