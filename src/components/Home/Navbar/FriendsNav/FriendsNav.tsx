import s from './FriendsNav.module.css'
import {FriendNavItem} from "./FriendItem/FriendNavItem"
import {FC} from "react"
import {UserType} from "../../../../types/types";
import {NavLink} from 'react-router-dom';


type PropsType = {
    friends: UserType[]
}

const FriendsNav: FC<PropsType> = ({friends}) => {
    const friendsList = friends.map(f => <FriendNavItem key={f.id} image={f.photos.small} name={f.name} userId={f.id}/>)
    return (
        <div className={s.friends}>
            <div className={s.title}>
                <p>Friends</p>
                <NavLink to="/friends" className={s.viewAll}>View all</NavLink>
            </div>
            <div className={s.list}>
                {friendsList}
            </div>
        </div >
    )
}

export default FriendsNav