import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = props => {
    let path = "/dialogs/" + props.id;
    return <NavLink to={path} className={navData => navData.isActive ? `${s.item} ${s.active}` : s.item}>{props.name}</NavLink>
}

const Message = props => {
    return <div className={s.message}>{props.message}</div>
}

const Dialogs = props => {
    let dialogsData = [
        {id: 1, name: 'Nikolas'},
        {id: 2, name: 'Julia'},
        {id: 3, name: 'Hanna'},
        {id: 4, name: 'David'},
        {id: 5, name: 'Mary'},
        {id: 6, name: 'Loren'},
    ]

    let messagesData = [
        {id: 1, message: 'Hi!"'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ]

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsList}>
                <DialogItem name={dialogsData[0].name} id={dialogsData[0].id} />
                <DialogItem name={dialogsData[1].name} id={dialogsData[1].id} />
                <DialogItem name={dialogsData[2].name} id={dialogsData[2].id} />
                <DialogItem name={dialogsData[3].name} id={dialogsData[3].id} />
                <DialogItem name={dialogsData[4].name} id={dialogsData[4].id} />
                <DialogItem name={dialogsData[5].name} id={dialogsData[5].id} />
            </div>
            <div className={s.chat}>
                <Message message={messagesData[0].message} />
                <Message message={messagesData[1].message} />
                <Message message={messagesData[2].message} />
                <Message message={messagesData[3].message} />
                <Message message={messagesData[4].message} />
            </div>
        </div>
    );
}

export default Dialogs;