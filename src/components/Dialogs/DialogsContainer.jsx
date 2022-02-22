import React from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {sendMessageCreator, updateNewMessageTextCreator} from "../../redux/dialogs-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

let mapStateToProps = state => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = dispatch => {
    return {
        sendMessage: () => dispatch(sendMessageCreator()),
        updateNewMessageText: text => dispatch(updateNewMessageTextCreator(text))
    }
}


let AuthRedirectComponent = withAuthRedirect(Dialogs);

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;