import {Message} from "./Message/Message";
import s from "./Chat.module.css";
import React from "react";

export const Chat = props => {

    let messages = props.messages.map(message => <Message message={message.message}/>)

    const sendMessage = () => props.sendMessage();

    const onMessageChange = e => props.updateNewMessageText(e.target.value);

    return (
        <div className={s.chat}>
            {messages}
           <div className={s.createMessage}>
                <textarea onChange={onMessageChange} placeholder={'Your message...'} value={props.newMessageText}></textarea>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}