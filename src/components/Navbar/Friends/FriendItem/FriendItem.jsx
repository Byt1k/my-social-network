import s from "./FriendItem.module.css";

export const FriendItem = props => {
    return (
        <a href="#" className={s.friend}>
            <div className={s.friendImg} style={{background: `url(${props.image}) no-repeat center center / cover`}}></div>
            <p>{props.firstName}</p>
        </a>
    );
}