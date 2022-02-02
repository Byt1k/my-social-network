let rendererEntireTree = () => {}

let state = {
    profilePage: {
        posts: [
            {id: 1, date: "25 sep 2021", likesCount: 13, text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto optio illo pariatur molestiae sapiente similique, velit impedit dolorum quam ducimus libero explicabo voluptatum officiis. Ipsum esse in sunt autem ipsam!"},
            {id: 2, date: "23 sep 2021", likesCount: 7, text: "Hey, why nobody love me?"},
            {id: 3, date: "21 sep 2021", likesCount: 913, text: "This is my first post. Now I'm with you!"}
        ],
        newPostText: ''
    },
    dialogsPage: {
        dialogs:  [
            {id: 1, name: 'Nikolas', image: 'data:image/jpeg;base64,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'},
            {id: 2, name: 'Julia', image: 'https://sefon.pro/img/artist_photos/julia-michaels.jpg'},
            {id: 3, name: 'Hanna', image: 'https://m.media-amazon.com/images/M/MV5BYjFjNTg1NWQtYzBmMS00ZGE5LTkyMDQtNWI2NDM2OWY4NjY0XkEyXkFqcGdeQWRvb2xpbmhk._V1_QL75_UX500_CR0,0,500,281_.jpg'},
            {id: 4, name: 'David', image: 'https://stuki-druki.com/biofoto2/David-Keosayan-01.jpg'},
            {id: 5, name: 'Marry', image: 'https://www.techexplorist.com/wp-content/uploads/2017/11/married_couple.jpg'},
            {id: 6, name: 'Loren', image: 'https://media.glamour.ru/photos/6169476e09a34169a91cb864/master/w_1600%2Cc_limit/GettyImages-166977813.jpg'},
        ],
        messages: [
            {id: 1, message: 'Hi!'},
            {id: 2, message: 'How are you?'},
            {id: 3, message: 'Yo'},
            {id: 4, message: 'Yo'},
            {id: 5, message: 'Yo'},
            {id: 6, message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto optio illo pariatur molestiae sapiente similique, velit impedit dolorum quam ducimus libero explicabo voluptatum officiis. Ipsum esse in sunt autem ipsam!'}
        ]
    },
    navbar: {
        friends: [
            {id: 1, image: 'https://img.freepik.com/free-photo/portrait-of-confident-beautiful-brunette-woman-turning-face-at-camera-with-dreamy-look-white_1258-19144.jpg?size=626&ext=jpg', firstName: 'Anna'},
            {id: 2, image: 'https://img.freepik.com/free-photo/portrait-dark-skinned-cheerful-woman-with-curly-hair-touches-chin-gently-laughs-happily-enjoys-day-off-feels-happy-enthusiastic-hears-something-positive-wears-casual-blue-turtleneck_273609-43443.jpg?size=626&ext=jpg&ga=GA1.1.1517186578.1641859200', firstName: 'Maria'},
            {id: 3, image: 'https://image.shutterstock.com/image-photo/portrait-happy-fashionable-handsome-man-260nw-600200732.jpg', firstName: 'Max'},
        ]
    }
}

window.state = state;

export const addPost = () => {
    let newPost = {
        id: 4,
        likesCount: 0,
        text: state.profilePage.newPostText
    }
    state.profilePage.posts.unshift(newPost);
    rendererEntireTree(state);
    state.profilePage.newPostText = '';
}

export const updateNewPostText = newText => {
    state.profilePage.newPostText = newText;
    rendererEntireTree(state);
}

export const subscribe = (observer) => {
    rendererEntireTree = observer;
}

export default state;