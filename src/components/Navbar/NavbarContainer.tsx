import {GlobalStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {FC, useEffect} from "react";
import {UserType} from "../../types/types";
import {getFriendsToNavbar, ThunkType} from "../../redux/navbar-reducer";
import Navbar from "./Navbar";

const NavbarContainer: FC<PropsType> = ({friends, getFriendsToNavbar}) => {
    useEffect(() => {
        getFriendsToNavbar()
    }, [])

    return <Navbar friends={friends} />
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        friends: state.navbar.friends
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, GlobalStateType>(mapStateToProps,
    {getFriendsToNavbar})(NavbarContainer)


type MapStatePropsType = {
    friends: UserType[]
}

type MapDispatchPropsType = {
    getFriendsToNavbar: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType
