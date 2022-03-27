import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import React from "react";
import {Message} from "./Message/Message";
import {Field, reduxForm, reset} from "redux-form";
import {Textarea} from "../common/FieldsForm/FieldsForm";
import {connect} from "react-redux";
import {sendMessage} from "../../redux/dialogs-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const Dialogs = props => {

    let dialogsItems = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id} image={d.image}/>)
    let messages = props.dialogsPage.messages.map(m => <Message key={m.id} message={m.message}/>)

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

let NewMessageForm = props => {
    return (
        <form onSubmit={props.handleSubmit} className={s.createMessage}>
            <Field component={Textarea} name={'newMessageText'} placeholder={'Your message...'} />
            <button>Send</button>
        </form>
    )
}

NewMessageForm = reduxForm({form: 'dialogsNewMessage'})(NewMessageForm);

let mapStateToProps = state => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

const DialogsContainer = compose(connect(mapStateToProps, {sendMessage}), withAuthRedirect)(Dialogs);

export default DialogsContainer;