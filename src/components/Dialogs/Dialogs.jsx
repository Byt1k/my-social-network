import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import React from "react";
import {ChatContainer} from "./Chat/ChatContainer";
import StoreContext from "../../StoreContext";


const Dialogs = props => {
    return (
        <StoreContext.Consumer>
            {store => {
                let state = store.getState().dialogsPage;

                let dialogsItems = state.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} image={dialog.image}/>)

                return (
                    <div className={s.dialogs}>
                        <div className={s.dialogsList}>
                            {dialogsItems}
                        </div>
                        <ChatContainer />
                    </div>
                );
            }}
        </StoreContext.Consumer>
    );
}

export default Dialogs;