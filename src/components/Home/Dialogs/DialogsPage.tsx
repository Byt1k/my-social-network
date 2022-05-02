import s from './DialogsPage.module.css'
import DialogItem from "./DialogItem/DialogItem"
import {useDispatch, useSelector} from "react-redux"
import {FC} from "react";
import {getDialogsPageData} from "../../../redux/selectors/dialogs-selectors";
import {Chat, SendMessageType} from "../../common/Chat/Chat";
import {actionsDialogs} from "../../../redux/dialogs-reducer";

export const DialogsPage: FC = () => {
    const dialogsPageData = useSelector(getDialogsPageData)
    const {dialogs, messages} = dialogsPageData

    const dialogsList = dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id} image={d.image}/>)
    const dispatch = useDispatch()
    const sendMessage: SendMessageType = (values, {resetForm}) => {
        dispatch(actionsDialogs.sendMessage(values.newMessage))
        resetForm()
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsList}>
                {dialogsList}
            </div>
            <div className={s.chat}>
                <Chat messages={messages} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

