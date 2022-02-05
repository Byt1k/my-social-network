import s from "./CreateMessage.module.css";
import React from "react";
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../../../redux/state";



export const CreateMessage = props => {

    const sendMessage = () => {
        props.dispatch(sendMessageActionCreator());
    }

    const onMessageChange = e => {
        let newMessageText = e.target.value;
        props.dispatch(updateNewMessageTextActionCreator(newMessageText))
    }

    return (
        <div className={s.createMessage}>
            <textarea onChange={onMessageChange} placeholder={'Your message...'} value={props.newMessageText}></textarea>
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}