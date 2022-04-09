// @ts-ignore
import s from './Friends.module.css'
import {FriendItem} from "./FriendItem/FriendItem"
import {connect} from "react-redux"
import {FC} from "react"
import {FriendType} from "../../../types/types"

type PropsType = {
    friends: Array<FriendType>
}

const Friends:FC<PropsType> = ({friends}) => {
    const friendsList = friends.map(f => <FriendItem key={f.id} image={f.image} firstName={f.firstName}/>)
    return (
        <div className={s.friends}>
            <div className={s.title}>
                <p>Friends</p>
                <a href="#" className={s.viewAll}>View all</a>
            </div>
            <div className={s.list}>
                {friendsList}
            </div>
        </div >
    );
}

let mapStateToProps = state => {
    return {
        friends: state.navbar.friends
    }
}

export default connect(mapStateToProps, {})(Friends)