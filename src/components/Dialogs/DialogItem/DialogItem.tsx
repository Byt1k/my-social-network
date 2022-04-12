import {NavLink} from "react-router-dom"
// @ts-ignore
import s from "./DialogItem.module.css"
import {FC} from "react"

type PropsType = {
    id: number
    image: string
    name: string
}

const DialogItem:FC<PropsType> = ({id, image, name}) => {
    let path = "/dialogs/" + id;
    const isActiveDialogs = (navData: any) => navData.isActive ? `${s.dialog} ${s.active}` : s.dialog
    return (
        <NavLink to={path} className={isActiveDialogs}>
            <div className={s.image} style={{background: `url(${image}) no-repeat center center / cover`}}></div>
            {name}
        </NavLink>
    )
}

export default DialogItem