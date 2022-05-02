import {FC, useEffect, useState} from "react";
import {Chat, MessageType} from "../../common/Chat/Chat";
import {FormikHelpers} from "formik";

export const GeneralChat: FC = () => {
    const wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    let [messages, setMessages] = useState<MessageType[]>([])

    useEffect(() => {
        wsChanel.addEventListener('message', (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])

    const sendMessage = (values: any, formik: FormikHelpers<any>) => {
        wsChanel.send(values.newMessage)
        formik.resetForm()
    }

    return <Chat messages={messages} sendMessage={sendMessage}/>
}