import {Navigate} from "react-router-dom";
import React, {FC} from "react";
import {useSelector} from "react-redux";
import {getIsAuth} from "../redux/auth-selectors";

export function withAuthRedirect <P>(Component: FC<P>) {
    const RedirectComponent: FC<P> = (props) => {
        const isAuth = useSelector(getIsAuth)
        if (!isAuth) {
            return <Navigate to='/login'/>
        }
        return <Component {...props} />
    }
    return RedirectComponent
}