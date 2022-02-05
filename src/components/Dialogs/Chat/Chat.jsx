import {Message} from "./Message/Message";
import s from "./Chat.module.css";
import React from "react";
import {sendMessageCreator, updateNewMessageTextCreator} from "../../../redux/dialogs-reducer";

export const Chat = props => {

    let messages = props.messages.map(message => <Message message={message.message}/>)

    const sendMessage = () => {
        props.dispatch(sendMessageCreator());
    }

    const onMessageChange = e => {
        let newMessageText = e.target.value;
        props.dispatch(updateNewMessageTextCreator(newMessageText))
    }

    return (
        <div className={s.chat}>
            {messages}
            {/*<CreateMessage dispatch={props.dispatch} newMessageText={props.newMessageText}/>*/}
            <div className={s.createMessage}>
                <textarea onChange={onMessageChange} placeholder={'Your message...'} value={props.newMessageText}></textarea>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}