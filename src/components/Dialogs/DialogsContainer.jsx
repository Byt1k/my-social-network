import React from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {sendMessage} from "../../redux/dialogs-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

let mapStateToProps = state => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

const DialogsContainer = connect(mapStateToProps, {sendMessage})(Dialogs);

export default withAuthRedirect(DialogsContainer);