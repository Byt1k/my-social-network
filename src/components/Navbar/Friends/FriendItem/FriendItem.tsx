import s from "./FriendItem.module.css"
import {FC} from "react"

type PropsType = {
    image: string | null
    firstName: string
}

export const FriendItem: FC<PropsType> = ({image, firstName}) => {
    return (
        <a href="#" className={s.friend}>
            <div className={s.friendImg} style={{background: `url(${image}) no-repeat center center / cover`}} />
            <p>{firstName}</p>
        </a>
    );
}