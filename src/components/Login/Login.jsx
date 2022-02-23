import s from './Login.module.css'
import {Field, reduxForm} from "redux-form";
import {login} from "../../redux/auth-reducer";
import {connect} from "react-redux";

const LoginForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.inputBlock}>
                <p>Email</p>
                <Field component={'input'} name={'email'} />
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
        let {email, password, rememberMe = false} = formData;
        props.login(email, password, rememberMe);
    }

    return (
        <div className={s.loginPage}>
            <h1>Sign In!</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

let mapStateToProps = state => {

}


export default connect(mapStateToProps, {login})(Login);