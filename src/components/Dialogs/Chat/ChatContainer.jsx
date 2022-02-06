import React from "react";
import {Chat} from "./Chat";
import {sendMessageCreator, updateNewMessageTextCreator} from "../../../redux/dialogs-reducer";

export const ChatContainer = props => {
    let messages = props.store.getState().dialogsPage.messages;
    let newMessageText = props.store.getState().dialogsPage.myNewMessageText;

    const sendMessage = () =>  props.store.dispatch(sendMessageCreator());

    const onMessageChange = text => props.store.dispatch(updateNewMessageTextCreator(text));

    return <Chat sendMessage={sendMessage} updateNewMessageText={onMessageChange} messages={messages} newMessageText={newMessageText}/>
}