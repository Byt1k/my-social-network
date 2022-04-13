import {Navigate} from "react-router-dom";
import React, {FC} from "react";
import {connect} from "react-redux";
import {GlobalStateType} from "../redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean
}

export function withAuthRedirect <P>(Component: FC<P>) {
    const RedirectComponent: FC<MapStatePropsType> = props => {
        let {isAuth, ...restProps} = props
        if (!isAuth) {
            return <Navigate to='/login'/>
        }
        return <Component {...restProps as P} />
    }
    let mapStateToPropsForRedirect = (state: GlobalStateType) => {
        return {
            isAuth: state.auth.isAuth
        }
    }
    return connect<MapStatePropsType, {}, P, GlobalStateType>(mapStateToPropsForRedirect, {})(RedirectComponent);
}