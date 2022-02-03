import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import React from "react";
import {Chat} from "./Chat/Chat";


const Dialogs = props => {

    let dialogsItems = props.state.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} image={dialog.image}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsList}>
                {dialogsItems}
            </div>
            <Chat messages={props.state.messages} dispatch={props.dispatch} newMessageText={props.state.myNewMessageText}/>
        </div>
    );
}

export default Dialogs;