import s from './DialogsPage.module.css'
import DialogItem from "./DialogItem/DialogItem"
import {useSelector} from "react-redux"
import {FC} from "react";
import {getDialogsPageData} from "../../../redux/selectors/dialogs-selectors";
import {Chat} from "../../common/Chat/Chat";

export const DialogsPage: FC = () => {
    const dialogsPageData = useSelector(getDialogsPageData)
    const {dialogs, messages} = dialogsPageData

    const dialogsList = dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id} image={d.image}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsList}>
                {dialogsList}
            </div>
            <div className={s.chat}>
                {/*<Chat messages={messages}/>*/}
            </div>
        </div>
    )
}

