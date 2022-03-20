import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import React from "react";
import {Message} from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FieldsForm/FieldsForm";

let NewMessageForm = props => {
    return (
        <form onSubmit={props.handleSubmit} className={s.createMessage}>
            <Field component={Textarea} name={'newMessageText'} placeholder={'Your message...'} />
            <button>Send</button>
        </form>
    )
}

NewMessageForm = reduxForm({form: 'dialogsNewMessage'})(NewMessageForm);

const Dialogs = props => {

    let dialogsItems = props.dialogsPage.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}
                                                                           image={dialog.image}/>)
    let messages = props.dialogsPage.messages.map(message => <Message message={message.message}/>)

    const sendMessage = values => props.sendMessage(values.newMessageText);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsList}>
                {dialogsItems}
            </div>
            <div className={s.chat}>
                {messages}
                <NewMessageForm onSubmit={sendMessage} />
            </div>
        </div>
    );

}


export default Dialogs;