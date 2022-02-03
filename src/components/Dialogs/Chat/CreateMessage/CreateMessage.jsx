import s from "./CreateMessage.module.css";
import React from "react";
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../../../redux/state";



export const CreateMessage = props => {
    let newMessage = React.createRef();

    const sendMessage = () => {
        props.dispatch(sendMessageActionCreator());
    }

    const onMessageChange = () => {
        let newMessageText = newMessage.current.value;
        props.dispatch(updateNewMessageTextActionCreator(newMessageText))
    }

    return (
        <div className={s.createMessage}>
            <textarea onChange={onMessageChange} placeholder={'Your message...'} ref={newMessage} value={props.newMessageText}></textarea>
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}