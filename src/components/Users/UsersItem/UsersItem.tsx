// @ts-ignore
import s from "../Users.module.css"
import {NavLink} from "react-router-dom"
// @ts-ignore
import defaultImage from "../../../assets/images/user.jpg"
import {FC} from "react";
import {UserType} from "../../../types/types";
import cn from 'classnames'

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const UsersItem: FC<PropsType> = ({user, followingInProgress, follow, unfollow}) => {
    const followingClick = () => !user.followed ? follow(user.id) : unfollow(user.id);
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
                        className={cn({[s.followed]: user.followed}, s.followBtn)}
                        onClick={() => followingClick()}>
                    {user.followed ? 'Unfollow' : 'Follow'}
                </button>
            </div>
        </div>
    )
}

export default UsersItem;
