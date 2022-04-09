// @ts-ignore
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem"
import Message from "./Message/Message"
import {Field, reduxForm} from "redux-form"
import {Textarea} from "../common/FieldsForm/FieldsForm"
import {connect} from "react-redux"
import {sendMessage} from "../../redux/dialogs-reducer"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import {compose} from "redux"
import {FC} from "react";
import {DialogType, MessageType} from "../../types/types"
import {GlobalStateType} from "../../redux/redux-store"

type MapStatePropsType = {
    dialogsPage: {
        dialogs: Array<DialogType>
        messages: Array<MessageType>
    }
}

type MapDispatchPropsType = {
    sendMessage: (newMessage: string) => void
}

type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const Dialogs: FC<PropsType> = ({dialogsPage, sendMessage}) => {

    let dialogsItems = dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id} image={d.image}/>)
    let messages = dialogsPage.messages.map(m => <Message key={m.id} message={m.message}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsList}>
                {dialogsItems}
            </div>
            <div className={s.chat}>
                {messages}
                <NewMessageForm onSubmit={values => sendMessage(values.newMessageText)}/>
            </div>
        </div>
    )
}

let NewMessageForm = props => {
    return (
        <form onSubmit={props.handleSubmit} className={s.createMessage}>
            <Field component={Textarea} name={'newMessageText'} placeholder={'Your message...'}/>
            <button>Send</button>
        </form>
    )
}

NewMessageForm = reduxForm({form: 'dialogsNewMessage'})(NewMessageForm);

let mapStateToProps = (state: GlobalStateType):MapStatePropsType => ({dialogsPage: state.dialogsPage})

const DialogsContainer = compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, GlobalStateType>(mapStateToProps, {sendMessage}),
    withAuthRedirect)(Dialogs);

export default DialogsContainer;