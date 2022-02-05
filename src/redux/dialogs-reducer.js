const SEND_MESSAGE= 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

const dialogsReducer = (state, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                id: 7,
                message: state.myNewMessageText
            }
            state.messages.push(newMessage);
            state.myNewMessageText = ''
            return state;
        case UPDATE_NEW_MESSAGE_TEXT:
            state.myNewMessageText = action.newMessageText;
            return state;
        default:
            return state;
    }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageTextCreator = text => ({type: UPDATE_NEW_MESSAGE_TEXT, newMessageText: text})

export default dialogsReducer;
