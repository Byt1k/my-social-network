import React from "react";
import {Chat} from "./Chat";
import {sendMessageCreator, updateNewMessageTextCreator} from "../../../redux/dialogs-reducer";
import StoreContext from "../../../StoreContext";

export const ChatContainer = props => {
    return (
        <StoreContext.Consumer>
            {store => {
                let messages = store.getState().dialogsPage.messages;
                let newMessageText = store.getState().dialogsPage.myNewMessageText;

                const sendMessage = () =>  store.dispatch(sendMessageCreator());

                const onMessageChange = text => store.dispatch(updateNewMessageTextCreator(text));
                return <Chat sendMessage={sendMessage} updateNewMessageText={onMessageChange} messages={messages} newMessageText={newMessageText}/>
            }}
        </StoreContext.Consumer>
    );

}