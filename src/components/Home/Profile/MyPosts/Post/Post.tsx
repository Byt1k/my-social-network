import s from './Post.module.css';
import defaultImage from '../../../../../assets/images/user.jpg'
import likeIcon from '../../../../../assets/images/like.svg'
import {ProfileType} from "../../../../../types/types";
import {FC} from "react";

type PropsType = {
    profile: ProfileType
    text: string
    likesCount: number
    date: string
}

const Post: FC<PropsType> = ({profile, text, likesCount, date}) => {
    return (
        <div className={s.item}>
            <div className={s.title}>
                <div className={s.ava} style={{background: `url(${profile.photos.small || defaultImage}) no-repeat center center / cover`}}></div>
                <div>
                    <p className={s.name}>{profile.fullName}</p>
                    <p className={s.date}>{date}</p>
                </div>
            </div>
            <div>
                <div className={s.text}>{text}</div>
                <div className={s.info}>
                    <button className={s.likes}>
                        <img src={likeIcon} alt="like" />
                        <p>{likesCount}</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Post;