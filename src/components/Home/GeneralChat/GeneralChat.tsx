import {FC, useEffect, useState} from "react";
import {Chat, MessageType, SendMessageType} from "../../common/Chat/Chat";

export const GeneralChat: FC = () => {

    let wsChannel: WebSocket;
    const createWsChannel = () => {
        wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    }
    createWsChannel();

    let [messages, setMessages] = useState<MessageType[]>([])

    useEffect(() => {
        wsChannel.addEventListener('message', (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])

    const sendMessage: SendMessageType = (values, {resetForm}) => {
        wsChannel.send(values.newMessage)
        resetForm()
    }

    return <Chat messages={messages} sendMessage={sendMessage} />
}