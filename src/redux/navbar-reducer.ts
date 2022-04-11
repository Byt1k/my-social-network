const initialState = {
    friends: [
        {id: 1, image: 'https://img.freepik.com/free-photo/portrait-of-confident-beautiful-brunette-woman-turning-face-at-camera-with-dreamy-look-white_1258-19144.jpg?size=626&ext=jpg', firstName: 'Anna'},
        {id: 2, image: 'https://img.freepik.com/free-photo/portrait-dark-skinned-cheerful-woman-with-curly-hair-touches-chin-gently-laughs-happily-enjoys-day-off-feels-happy-enthusiastic-hears-something-positive-wears-casual-blue-turtleneck_273609-43443.jpg?size=626&ext=jpg&ga=GA1.1.1517186578.1641859200', firstName: 'Maria'},
        {id: 3, image: 'https://image.shutterstock.com/image-photo/portrait-happy-fashionable-handsome-man-260nw-600200732.jpg', firstName: 'Max'},
    ]
}

type InitialStateType = typeof initialState

const navbarReducer = (state = initialState, action):InitialStateType => {
    switch (action) {
        default: return state
    }
}

export default navbarReducer
