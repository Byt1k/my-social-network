import Friends from "./Friends";
import React from "react";
import StoreContext from "../../../StoreContext";


const FriendsContainer = props => {
    return (
        <StoreContext.Consumer>
            {store => {
                let friends = store.getState().navbar.friends;
                return <Friends friends={friends}/>
            }}
        </StoreContext.Consumer>
    );
}

export default FriendsContainer;