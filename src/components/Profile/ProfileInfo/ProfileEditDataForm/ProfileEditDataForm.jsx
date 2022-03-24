import s from './ProfileEditDataForm.module.css';
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../../common/FieldsForm/FieldsForm";
import {requeired} from "../../../../utils/validators";

let ProfileEditDataForm = ({handleSubmit, error}) => {
    return (
        <form className={s.form} onSubmit={handleSubmit} >
            <p className={s.title}>Editing your profile information</p>
            <div className={s.formItem}>
                <p className={s.fieldTitle}>Full name:</p>
                <Field component={Input} name='fullName' validate={requeired} placeholder='Full name'/>
            </div>
            <div className={s.formItem}>
                <p className={s.fieldTitle}>About me:</p>
                <Field component={Textarea} name='aboutMe' validate={requeired} placeholder='About me'/>
            </div>
            <p className={s.secondTitle}>Contacts</p>
            <div className={s.formItem}>
                <p className={s.fieldTitle}>Facebook:</p>
                <Field component={Input} name='contacts.facebook' placeholder='Facebook'/>
            </div>
            <div className={s.formItem}>
                <p className={s.fieldTitle}>Instagram:</p>
                <Field component={Input} name='contacts.instagram' placeholder='Instagram'/>
            </div>
            <div className={s.formItem}>
                <p className={s.fieldTitle}>VK:</p>
                <Field component={Input} name='contacts.vk' placeholder='VK'/>
            </div>
            <div className={s.formItem}>
                <p className={s.fieldTitle}>Twitter:</p>
                <Field component={Input} name='contacts.twitter' placeholder='Twitter'/>
            </div>
            <div className={s.formItem}>
                <p className={s.fieldTitle}>GitHub:</p>
                <Field component={Input} name='contacts.github' placeholder='GitHub'/>
            </div>
            <div className={s.formItem}>
                <p className={s.fieldTitle}>YouTube:</p>
                <Field component={Input} name='contacts.youtube' placeholder='YouTube'/>
            </div>
            <div className={s.formItem}>
                <p className={s.fieldTitle}>Web site:</p>
                <Field component={Input} name='contacts.website' placeholder='Web site'/>
            </div>
            <div className={s.formItem}>
                <p className={s.fieldTitle}>Main link:</p>
                <Field component={Input} name='contacts.mainLink' placeholder='Main link'/>
            </div>
            <div className={`${s.formItem} ${s.lookingJob}`}>
                <p className={s.fieldTitle}>Looking for a job:</p>
                <Field component={Input} name='lookingForAJob' type='checkbox' />
            </div>
            <div className={s.formItem}>
                <p className={s.fieldTitle}>Job search details:</p>
                <Field component={Input} name='lookingForAJobDescription' placeholder='Job search details'/>
            </div>
            {error && <div className={s.summaryError}>{error}</div>}
            <button className={s.save}>Save</button>
        </form>
    )
}

export default reduxForm({form: 'editProfile'})(ProfileEditDataForm);