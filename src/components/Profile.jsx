const Profile = () => {
    const preview = {
        background: 'url(https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/fl4bzxx2pvifrjtc4l6x) no-repeat center center / cover'
    }
    const imageMartin = {
        background: 'url(https://www.onlineheadway.com/assets/img/courses/06.jpg) no-repeat center center / cover'
    }
    return (
        <div className="content box">
            <div className="preview"
                style={preview}>
            </div>
            <div className="info">
                <div className="avatar"
                    style={imageMartin}>
                    <div className="status"></div>
                </div>
                <p className="name">Martin James</p>
            </div>
            <div className="description">
                <p>Date of Birth: <span>11 April</span></p>
                <p>City: <span>Minsk</span></p>
                <p>Education: <span>Military Academy</span></p>
                <p>Web Site: <span>vk.com</span></p>
            </div>
            <div className="posts">
                <div className="title">My posts</div>
                <form className="posts__new-post">
                    <textarea className="posts__textarea" placeholder="Your news..."></textarea>
                    <button type="submit">Send</button>
                </form>
                <div className="posts__item">
                    <div className="posts__item_avatar"
                        style={imageMartin}>
                    </div>
                    <div>
                        <p className="posts__item_text">Hey, why nobody love me?</p>
                        <p className="posts__item_date">25 Sep</p>
                    </div>
                </div>
                <div className="posts__item">
                    <div className="posts__item_avatar"
                        style={imageMartin}>
                    </div>
                    <div>
                        <p className="posts__item_text">This is my first post. Now I'm with you!</p>
                        <p className="posts__item_date">22 Sep</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;