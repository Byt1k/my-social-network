import s from './Friends.module.css';

const Friends = () => {
    const imageAnna = {
        background: 'url(https://img.freepik.com/free-photo/portrait-of-confident-beautiful-brunette-woman-turning-face-at-camera-with-dreamy-look-white_1258-19144.jpg?size=626&ext=jpg) no-repeat center center / cover'
    }
    const imageMaria = {
        background: 'url(https://img.freepik.com/free-photo/portrait-dark-skinned-cheerful-woman-with-curly-hair-touches-chin-gently-laughs-happily-enjoys-day-off-feels-happy-enthusiastic-hears-something-positive-wears-casual-blue-turtleneck_273609-43443.jpg?size=626&ext=jpg&ga=GA1.1.1517186578.1641859200) no-repeat center center / cover'
    }
    const imageMax = {
        background: 'url(https://image.shutterstock.com/image-photo/portrait-happy-fashionable-handsome-man-260nw-600200732.jpg) no-repeat center center / cover'
    }
    return (
        <div className={s.friends}>
            <div className={s.title}>
                <p>Friends</p>
                <a href="#" className={s.viewAll}>View all</a>
            </div>
            <div className={s.list}>
                <a href="#" className={s.friend}>
                    <div className={s.friendImg} style={imageAnna}></div>
                    <p>Anna</p>
                </a>
                <a href="#" className={s.friend}>
                    <div className={s.friendImg} style={imageMaria}></div>
                    <p>Maria</p>
                </a>
                <a href="#" className={s.friend}>
                    <div className={s.friendImg} style={imageMax}></div>
                    <p>Max</p>
                </a>
            </div>
        </div >
    );
}

export default Friends;