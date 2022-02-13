import s from './Friends.module.css';
import {FriendItem} from "./FriendItem/FriendItem";


const Friends = props => {
    let friends = props.friends.map(friend => <FriendItem key={friend.id} image={friend.image} firstName={friend.firstName}/>)
    return (
        <div className={s.friends}>
            <div className={s.title}>
                <p>Friends</p>
                <a href="#" className={s.viewAll}>View all</a>
            </div>
            <div className={s.list}>
                {friends}
            </div>
        </div >
    );
}

export default Friends;