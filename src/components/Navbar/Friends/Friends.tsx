import s from './Friends.module.css'
import {FriendItem} from "./FriendItem/FriendItem"
import {connect} from "react-redux"
import {FC} from "react"
import {GlobalStateType} from "../../../redux/redux-store";

type FriendType = {
    id: number
    image: string | null
    firstName: string
}

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

let mapStateToProps = (state: GlobalStateType) => {
    return {
        friends: state.navbar.friends
    }
}

export default connect(mapStateToProps, {})(Friends)