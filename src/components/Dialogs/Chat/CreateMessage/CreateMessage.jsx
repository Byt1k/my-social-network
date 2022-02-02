import s from "./CreateMessage.module.css";
import React from "react";

export const CreateMessage = props => {
    let newMessage = React.createRef();
    const sendMessage = () => {
        let messageText = newMessage.current.value;
        alert(messageText);
    }

    return (
        <div className={s.createMessage}>
            <textarea placeholder={'Your message...'} ref={newMessage}></textarea>
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}