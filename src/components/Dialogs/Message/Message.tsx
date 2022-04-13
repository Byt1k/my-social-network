import s from "./Message.module.css"
import {FC} from "react"

type PropsType = {
    message: string
}

const Message: FC<PropsType> = ({message}) => {
    return (
        <div className={s.message}>
            <div className={s.author} style={{background: `url(https://www.onlineheadway.com/assets/img/courses/06.jpg) no-repeat center center / cover`}} />
            <p className={s.text}>
                {message}
                <span className={s.time}>22:33</span>
            </p>
        </div>
    )
}

export default Message