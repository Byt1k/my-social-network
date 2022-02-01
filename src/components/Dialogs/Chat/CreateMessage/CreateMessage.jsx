import s from "./CreateMessage.module.css";
import React from "react";

export const CreateMessage = props => {
    return (
        <div className={s.createMessage}>
            <textarea placeholder={'Your message...'}></textarea>
            <button type={'submit'}>Send</button>
        </div>
    );
}