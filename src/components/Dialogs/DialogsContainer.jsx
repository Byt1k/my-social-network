import React from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {sendMessageCreator, updateNewMessageTextCreator} from "../../redux/dialogs-reducer";

let mapStateToProps = state => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = dispatch => {
    return {
        sendMessage: () => dispatch(sendMessageCreator()),
        updateNewMessageText: text => dispatch(updateNewMessageTextCreator(text))
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;