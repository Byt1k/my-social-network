import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem"
import Message from "./Message/Message"
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {Textarea} from "../../common/FieldsForm/FieldsForm"
import {useDispatch, useSelector} from "react-redux"
import {actionsDialogs} from "../../../redux/dialogs-reducer"
import {FC} from "react";
import {getDialogsPageData} from "../../../redux/selectors/dialogs-selectors";

type NewMessageType = {
    newMessageText: string
}

export const DialogsPage: FC = () => {

    const dialogsPageData = useSelector(getDialogsPageData)
    const {dialogs, messages} = dialogsPageData

    const dispatch = useDispatch();

    const dialogsList = dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id} image={d.image}/>)
    const messagesList = messages.map(m => <Message key={m.id} message={m.message}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsList}>
                {dialogsList}
            </div>
            <div className={s.chat}>
                {messagesList}
                <NewMessageReduxForm onSubmit={(values: NewMessageType) => {
                    dispatch(actionsDialogs.sendMessage(values.newMessageText))
                }}/>
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
