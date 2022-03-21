import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

export const withAuthRedirect = Component => {
    const RedirectComponent = props => {
        if (!props.isAuth) {
            return <Navigate to={'/login'}/>
        }
        return <Component {...props}/>
    }
    let mapStateToPropsForRedirect = state => {
        return {
            isAuth: state.auth.isAuth
        }
    }
    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}