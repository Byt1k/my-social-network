import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import React from "react";
import {Chat} from "./Chat/Chat";
import {ChatContainer} from "./Chat/ChatContainer";


const Dialogs = props => {
    let state = props.store.getState().dialogsPage;

    let dialogsItems = state.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} image={dialog.image}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsList}>
                {dialogsItems}
            </div>
            <ChatContainer store={props.store} />
        </div>
    );
}

export default Dialogs;