import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import React from "react";
import {Message} from "./Message/Message";


const Dialogs = props => {

    let dialogsItems = props.dialogsPage.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} image={dialog.image}/>)
    let messages = props.dialogsPage.messages.map(message => <Message message={message.message}/>)

    const sendMessage = () => props.sendMessage();
    const onMessageChange = e => props.updateNewMessageText(e.target.value);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsList}>
                {dialogsItems}
            </div>
            <div className={s.chat}>
                {messages}
                <div className={s.createMessage}>
                        <textarea onChange={onMessageChange} placeholder={'Your message...'}
                                  value={props.dialogsPage.newMessageText}></textarea>
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}


export default Dialogs;