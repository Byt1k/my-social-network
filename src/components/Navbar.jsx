const Navbar = () => {
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
        <div className="sidebar box">
            <ul className="sidebar__menu">
                <li><a href="#" className="active">My profile</a></li>
                <li><a href="#">Message</a></li>
                <li><a href="#">News</a></li>
                <li><a href="#">Music</a></li>
                <li><a href="#">Settings</a></li>
            </ul>
            <div className="sidebar__friends">
                <div className="sidebar__friends_head">
                    <p className="title">Friends</p>
                    <a href="#" className="view-all">View all</a>
                </div>
                <div className="sidebar__friends-list">
                    <a href="#" className="sidebar__friends-item">
                        <div className="sidebar__friends-item_img" style={imageAnna}></div>
                        <p className="sidebar__friends-item_name">Anna</p>
                    </a>
                    <a href="#" className="sidebar__friends-item">
                        <div className="sidebar__friends-item_img"
                            style={imageMaria}>
                        </div>
                        <p className="sidebar__friends-item_name">Maria</p>
                    </a>
                    <a href="#" className="sidebar__friends-item">
                        <div className="sidebar__friends-item_img" style={imageMax}></div>
                        <p className="sidebar__friends-item_name">Max</p>
                    </a>
                </div>
            </div >
        </div >
    );
}

export default Navbar;