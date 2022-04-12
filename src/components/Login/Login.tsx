// @ts-ignore
import s from './Login.module.css'
import {InjectedFormProps, reduxForm} from "redux-form";
import {login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {createField, Input} from "../common/FieldsForm/FieldsForm";
import {email, required} from "../../utils/validators";
import {Navigate} from "react-router-dom";
import {FC} from "react";
import {GlobalStateType} from "../../redux/redux-store";

type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

type LoginFormDataKeys = Extract<keyof LoginFormDataType, string>

type LoginOwnPropsType = {
    captchaUrl: string | null
}

const LoginForm: FC<InjectedFormProps<LoginFormDataType, LoginOwnPropsType> & LoginOwnPropsType> = ({
                                                                                                         handleSubmit,
                                                                                                         error,
                                                                                                         captchaUrl
                                                                                                     }) => {
    return (
        <form className={s.formLogin} onSubmit={handleSubmit}>
            {createField<LoginFormDataKeys>('Email', Input, "email", [required, email])}
            {createField<LoginFormDataKeys>('Password', Input, 'password', [required], {type: 'password'})}
            {createField<LoginFormDataKeys>('Remember Me', 'input', 'rememberMe', [], {type: 'checkbox'})}
            {captchaUrl && (
                <div className={s.captchaBlock}>
                    {createField<LoginFormDataKeys>('Captcha', Input, 'captcha', [required])}
                    <img src={captchaUrl} alt="captcha"/>
                </div>
            )}
            <button>Sign In!</button>
            {error && <div className={s.commonFormError}>{error}</div>}
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormDataType, LoginOwnPropsType>({form: 'login'})(LoginForm)

const Login: FC<MapStatePropsType & MapDispatchPropsType> = ({login, isAuth, captchaUrl}) => {
    const onSubmit = (formData: LoginFormDataType) => {
        let {email, password, rememberMe = false, captcha = null} = formData;
        login(email, password, rememberMe, captcha);
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

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => Promise<void>
}

const mapStateToProps = (state: GlobalStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

// @ts-ignore
export default connect(mapStateToProps, {login})(Login);