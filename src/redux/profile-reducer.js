const ADD_POST= 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts: [
        {id: 1, date: "25 sep 2021", likesCount: 13, text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto optio illo pariatur molestiae sapiente similique, velit impedit dolorum quam ducimus libero explicabo voluptatum officiis. Ipsum esse in sunt autem ipsam!"},
        {id: 2, date: "23 sep 2021", likesCount: 7, text: "Hey, why nobody love me?"},
        {id: 3, date: "21 sep 2021", likesCount: 913, text: "This is my first post. Now I'm with you!"}
    ],
    newPostText: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 4,
                likesCount: 0,
                text: state.newPostText
            }
            state.posts.unshift(newPost);
            state.newPostText = '';
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}

export const addPostCreator = () => ({type: ADD_POST});
export const updateNewPostTextCreator = text => ({type: UPDATE_NEW_POST_TEXT, newText: text})

export default profileReducer;
