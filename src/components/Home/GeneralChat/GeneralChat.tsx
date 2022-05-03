import {FC, useEffect, useState} from "react";
import {Chat, MessageType, SendMessageType} from "../../common/Chat/Chat";
import Preloader from "../../common/Preloader/Preloader";

export const GeneralChat: FC = () => {
    const [ws, setWs] = useState<WebSocket | null>(null)

    useEffect(() => {
        let wsChannel: WebSocket;
        const closeHandler = () => {
            console.log('WS CLOSE')
            setTimeout(createWs, 3000)
        }
        const createWs = () => {
            if (wsChannel !== null) {
                ws?.removeEventListener('close', closeHandler)
            }
            wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            wsChannel.addEventListener('error', () => {
                console.log('WS ERROR')
                ws?.close();
            })
            wsChannel.addEventListener('close', closeHandler)
            setWs(wsChannel)
        }
        createWs()
        return () => {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
        }
    }, [])

    const [messages, setMessages] = useState<MessageType[]>([])
    const [wsIsReady, setWsIsReady] = useState(false)

    useEffect(() => {
        ws?.addEventListener('open', () => {
            console.log('WS OPEN')
            setWsIsReady(true)
        })

        ws?.addEventListener('message', (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [ws])

    const sendMessage: SendMessageType = (values, {resetForm}) => {
        ws?.send(values.newMessage)
        resetForm()
    }

    return wsIsReady ? <Chat messages={messages} sendMessage={sendMessage}/> : <Preloader/>
}

