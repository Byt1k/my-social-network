import s from './Login.module.css'
import {Field, reduxForm} from "redux-form";
import {login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Input} from "../common/FieldsForm/FieldsForm";
import {email, required} from "../../utils/validators";
import {Navigate} from "react-router-dom";

let LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form className={s.formLogin} onSubmit={handleSubmit}>
            <div className={s.inputBlock}>
                <p>Email</p>
                <Field component={Input} name={'email'} validate={[required, email]} />
            </div>
            <div className={s.inputBlock}>
                <p>Password</p>
                <Field component={Input} name={'password'} type={'password'} validate={required}/>
            </div>
            <div className={s.checkboxBlock}>
                <Field component={'input'} name={'rememberMe'} type={'checkbox'} id={'rememberMe'}/>
                <label htmlFor={'rememberMe'}>Remember Me</label>
            </div>
            {captchaUrl && (
                <div className={s.captchaBlock}>
                    <div className={s.inputBlock}>
                        <p>Captcha</p>
                        <Field component={Input} name={'captcha'} validate={required} />
                    </div>
                    <img src={captchaUrl} alt="captcha"/>
                </div>
            )}
            <button>Sign In!</button>
            {error && <div className={s.commonFormError}>{error}</div>}
        </form>
    )
}

LoginForm = reduxForm({form: 'login'})(LoginForm)

const Login = ({login, isAuth, captchaUrl}) => {

    const onSubmit = formData => {
        let {email, password, rememberMe = false, captcha = null} = formData;
        login(email, password, rememberMe, captcha);
    }

    if (isAuth) {
        return <Navigate to={'/profile'} />
    }

    return (
        <div className={s.loginPage}>
            <h1>Sign In!</h1>
            <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    )
}

let mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})


export default connect(mapStateToProps, {login})(Login);