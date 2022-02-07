import Friends from "./Friends";
import React from "react";
import {connect} from "react-redux";

let mapStateToProps = state => {
    return {
        friends: state.navbar.friends
    }
}

let mapDispatchToProps = dispatch => {
    return {

    }
}


const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends)

export default FriendsContainer;