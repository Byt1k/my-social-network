import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Field, Form, Formik, FormikHelpers} from "formik";
import s from './Chat.module.css'
import { NavLink } from "react-router-dom";
import defaultImage from '../../../assets/images/user.jpg'
import cn from 'classnames'
import {getAuthorizedUserId} from "../../../redux/selectors/auth-selectors";

export type MessageType = {
    userName: string
    photo: string
    userId: number
    message: string
}
export type SendMessageType = (values: any, formik: FormikHelpers<any>) => void
type ChatPropsType = {
    messages: MessageType[]
    sendMessage: SendMessageType
}

export const Chat: FC<ChatPropsType> = ({messages, sendMessage}) => {
    const messagesList = messages
        .map((m, index) => <Message key={index} message={m}/>)
        .reverse()
    return (
        <div className={s.chat}>
            <div className={s.messages}>
                {messagesList}
            </div>
            <NewMessageForm sendMessage={sendMessage}/>
        </div>
    )
}

const Message: FC<{ message: MessageType }> = ({message}) => {

    const authUserId = useSelector(getAuthorizedUserId)
    return (
        <div className={cn(s.message, {[s.authUserMessage]: message.userId === authUserId})}>
            <NavLink to={'/profile/' + message.userId} className={s.author}>
                <img src={message.photo || defaultImage} alt="photo" />
                <p>{message.userName}</p>
            </NavLink>
            <p className={s.text}>
                {message.message}
            </p>
        </div>
    )
}

const NewMessageForm: FC<{ sendMessage: SendMessageType }> = ({sendMessage}) => {
    return (
        <Formik initialValues={{newMessage: ''}}
                onSubmit={sendMessage}>
            <Form className={s.createMessage}>
                <Field name='newMessage' placeholder='Your message...' as='textarea'/>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}

// ({newMessage}, {resetForm}) => {
//     dispatch(actionsDialogs.sendMessage(newMessage))
//     resetForm()
// }}