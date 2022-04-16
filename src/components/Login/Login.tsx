import s from './Login.module.css'
import {login} from "../../redux/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {FC} from "react";
import {getCaptcha, getIsAuth} from "../../redux/auth-selectors";
import {LoginFormDataType, LoginReduxForm} from "./LoginForm";

export const Login: FC = () => {
    const isAuth = useSelector(getIsAuth)
    const captchaUrl = useSelector(getCaptcha)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormDataType) => {
        let {email, password, rememberMe = false, captcha = null} = formData
        dispatch(login(email, password, rememberMe, captcha))
    }

    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={s.loginPage}>
            <h1>Sign In!</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    )
}

