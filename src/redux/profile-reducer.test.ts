import profileReducer, {actionsProfile, InitialStateType} from "./profile-reducer";

let state: InitialStateType;

beforeEach(() => {
    state = {
        posts: [
            {
                id: 1,
                date: "25 sep 2021",
                likesCount: 13,
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto optio illo pariatur molestiae sapiente similique, velit impedit dolorum quam ducimus libero explicabo voluptatum officiis. Ipsum esse in sunt autem ipsam!"
            },
            {id: 2, date: "23 sep 2021", likesCount: 7, text: "Hey, why nobody love me?"},
            {id: 3, date: "21 sep 2021", likesCount: 913, text: "This is my first post. Now I'm with you!"}
        ],
        profile: null,
        userStatus: ''
    }
})

test('posts count should incremented', () => {
    let newPostText = 'Hello!';
    let action = actionsProfile.addPost(newPostText, '', 1);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(4);
});

test('posts message is correct', () => {
    let newPostText = 'Hello!';
    let action = actionsProfile.addPost(newPostText, '', 1);
    let newState = profileReducer(state, action);
    expect(newState.posts[0].text).toBe(newPostText);
});


