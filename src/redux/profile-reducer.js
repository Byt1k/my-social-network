const ADD_POST= 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const profileReducer = (state, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 4,
                likesCount: 0,
                text: this.state.newPostText
            }
            this.state.posts.unshift(newPost);
            this.state.newPostText = '';
            return state;
        case UPDATE_NEW_POST_TEXT:
            this.state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}

export const addPostCreator = () => ({type: ADD_POST});
export const updateNewPostTextCreator = text => ({type: UPDATE_NEW_POST_TEXT, newText: text})

export default profileReducer;
