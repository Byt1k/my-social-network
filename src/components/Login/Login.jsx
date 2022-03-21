import s from './Login.module.css'
import {Field, reduxForm} from "redux-form";
import {login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Input} from "../common/FieldsForm/FieldsForm";
import {email, requeired} from "../../utils/validators";
import {Navigate} from "react-router-dom";

let LoginForm = props => {
    return (
        <form className={s.formLogin} onSubmit={props.handleSubmit}>
            <div className={s.inputBlock}>
                <p>Email</p>
                <Field component={Input} name={'email'} validate={[requeired, email]} />
            </div>
            <div className={s.inputBlock}>
                <p>Password</p>
                <Field component={Input} name={'password'} type={'password'} validate={requeired}/>
            </div>
            <div className={s.checkboxBlock}>
                <Field component={'input'} name={'rememberMe'} type={'checkbox'} id={'rememberMe'}/>
                <label htmlFor={'rememberMe'}>Remember Me</label>
            </div>
            <button>Sign In!</button>
            {props.error && <div className={s.commonFormError}>{props.error}</div>}
        </form>
    )
}

LoginForm = reduxForm({form: 'login'})(LoginForm)

const Login = props => {

    const onSubmit = formData => {
        let {email, password, rememberMe = false} = formData;
        props.login(email, password, rememberMe);
    }

    if (props.isAuth) {
        return <Navigate to={'/profile'} />
    }

    return (
        <div className={s.loginPage}>
            <h1>Sign In!</h1>
            <LoginForm onSubmit={onSubmit} />
        </div>
    )
}

let mapStateToProps = state => ({
    isAuth: state.auth.isAuth
})


export default connect(mapStateToProps, {login})(Login);