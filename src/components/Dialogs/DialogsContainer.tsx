// @ts-ignore
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem"
import Message from "./Message/Message"
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {Textarea} from "../common/FieldsForm/FieldsForm"
import {connect} from "react-redux"
import {actionsDialogs} from "../../redux/dialogs-reducer"
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

type PropsType = MapStatePropsType & MapDispatchPropsType

type NewMessageType = {
    newMessageText: string
}

const Dialogs: FC<PropsType> = ({dialogsPage: {dialogs, messages}, sendMessage}) => {

    const dialogsList = dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id} image={d.image}/>)
    const messagesList = messages.map(m => <Message key={m.id} message={m.message}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsList}>
                {dialogsList}
            </div>
            <div className={s.chat}>
                {messagesList}
                <NewMessageReduxForm onSubmit={values => sendMessage(values.newMessageText)}/>
            </div>
        </div>
    )
}

const NewMessageForm: FC<InjectedFormProps<NewMessageType>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className={s.createMessage}>
            <Field component={Textarea} name='newMessageText' placeholder='Your message...' />
            <button>Send</button>
        </form>
    )
}

const NewMessageReduxForm = reduxForm<NewMessageType>({form: 'dialogsNewMessage'})(NewMessageForm);

const mapStateToProps = (state: GlobalStateType):MapStatePropsType => ({dialogsPage: state.dialogsPage})

const DialogsContainer = compose(
    connect<MapStatePropsType, MapDispatchPropsType, {}, GlobalStateType>(mapStateToProps,
        {sendMessage: actionsDialogs.sendMessage}),
    withAuthRedirect)(Dialogs)

export default DialogsContainer