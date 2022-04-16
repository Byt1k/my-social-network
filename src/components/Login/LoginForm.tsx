import {InjectedFormProps, reduxForm} from "redux-form";
import {FC} from "react";
import s from "./Login.module.css";
import {createField, Input} from "../common/FieldsForm/FieldsForm";
import {email, required} from "../../utils/validators";

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
export const LoginReduxForm = reduxForm<LoginFormDataType, LoginOwnPropsType>({form: 'login'})(LoginForm)

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

type LoginFormDataKeys = Extract<keyof LoginFormDataType, string>

type LoginOwnPropsType = {
    captchaUrl: string | null
}