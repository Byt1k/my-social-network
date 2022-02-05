import s from "./CreateMessage.module.css";
import React from "react";
import {sendMessageCreator, updateNewMessageTextCreator} from "../../../../redux/dialogs-reducer";



export const CreateMessage = props => {

    const sendMessage = () => {
        props.dispatch(sendMessageCreator());
    }

    const onMessageChange = e => {
        let newMessageText = e.target.value;
        props.dispatch(updateNewMessageTextCreator(newMessageText))
    }

    return (
        <div className={s.createMessage}>
            <textarea onChange={onMessageChange} placeholder={'Your message...'} value={props.newMessageText}></textarea>
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}