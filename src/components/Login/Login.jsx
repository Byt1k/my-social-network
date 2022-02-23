import s from './Login.module.css'
import {Field, reduxForm} from "redux-form";

const LoginForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.inputBlock}>
                <p>Login</p>
                <Field component={'input'} name={'login'} />
            </div>
            <div className={s.inputBlock}>
                <p>Password</p>
                <Field component={'input'} name={'password'} type={'password'}/>
            </div>
            <div className={s.checkboxBlock}>
                <Field component={'input'} name={'rememberMe'} type={'checkbox'} id={'rememberMe'}/>
                <label htmlFor={'rememberMe'}>Remember Me</label>
            </div>
            <button>Sign In!</button>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = props => {

    const onSubmit = formData => {
        console.log(formData);
    }

    return (
        <div className={s.loginPage}>
            <h1>Sign In!</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

export default Login;