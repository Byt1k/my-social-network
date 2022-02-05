const SEND_MESSAGE= 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

const dialogsReducer = (state, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                id: 7,
                message: this._state.dialogsPage.myNewMessageText
            }
            this._state.dialogsPage.messages.push(newMessage);
            this._callSubscriber(this._state);
            this._state.dialogsPage.myNewMessageText = ''
            return state;
        case UPDATE_NEW_MESSAGE_TEXT:
            this._state.dialogsPage.myNewMessageText = action.newMessageText;
            this._callSubscriber(this._state);
            return state;
        default:
            return state;
    }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageTextCreator = text => ({type: UPDATE_NEW_MESSAGE_TEXT, newMessageText: text})

export default dialogsReducer;
