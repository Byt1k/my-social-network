// @ts-ignore
import s from "./FriendItem.module.css"
import {FC} from "react"

type PropsType = {
    image: string
    firstName: string
}

export const FriendItem: FC<PropsType> = ({image, firstName}) => {
    return (
        <a href="#" className={s.friend}>
            <div className={s.friendImg} style={{background: `url(${image}) no-repeat center center / cover`}}></div>
            <p>{firstName}</p>
        </a>
    );
}