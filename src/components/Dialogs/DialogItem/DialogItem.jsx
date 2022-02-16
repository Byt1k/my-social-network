import {NavLink} from "react-router-dom";
import s from "./DialogItem.module.css";

export const DialogItem = props => {
    let path = "/dialogs/" + props.id;
    return (
        <NavLink to={path} className={s.dialog} activeClassName={s.active}>
            <div className={s.image} style={{background: `url(${props.image}) no-repeat center center / cover`}}></div>
            {props.name}
        </NavLink>
    )
}