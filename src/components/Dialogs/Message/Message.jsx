import s from "./Message.module.css";
import React from "react";

export const Message = props => {
    return (
        <div className={s.message}>
            <div className={s.author} style={{background: `url(https://www.onlineheadway.com/assets/img/courses/06.jpg) no-repeat center center / cover`}}></div>
            <p className={s.text}>
                {props.message}
                <span className={s.time}>22:33</span>
            </p>
        </div>
    )
}