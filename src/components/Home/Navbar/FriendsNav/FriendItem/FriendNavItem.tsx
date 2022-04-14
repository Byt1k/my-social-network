import s from "./FriendNavItem.module.css"
import {FC} from "react"
import defaultImage from '../../../../../assets/images/user.jpg'
import {NavLink} from "react-router-dom"

type PropsType = {
    image: string | null
    name: string
    userId: number
}

export const FriendNavItem: FC<PropsType> = ({userId, image, name}) => {
    return (
        <NavLink to={'/profile/' + userId} className={s.friend}>
            <div className={s.friendImg} style={{background: `url(${image || defaultImage}) no-repeat center center / cover`}} />
            <p className={s.name}>{name}</p>
        </NavLink>
    )
}