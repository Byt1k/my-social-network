import {Message} from "./Message/Message";
import s from "./Chat.module.css";
import {CreateMessage} from "./CreateMessage/CreateMessage";
import React from "react";

export const Chat = props => {

    let messages = props.messages.map(message => <Message message={message.message}/>)

    return (
        <div className={s.chat}>
            {messages}
            <CreateMessage/>
        </div>
    );
}