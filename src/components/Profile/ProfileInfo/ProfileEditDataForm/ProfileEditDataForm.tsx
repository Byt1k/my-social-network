import s from './ProfileEditDataForm.module.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../../../common/FieldsForm/FieldsForm";
import {required} from "../../../../utils/validators";
import {FC} from "react";
import {ProfileType} from "../../../../types/types";

type ProfileEditFormKeys = Extract<keyof ProfileType, string>

const ProfileEditDataForm: FC<InjectedFormProps<ProfileType>> = ({handleSubmit, error}) => {
    return (
        <form className={s.form} onSubmit={handleSubmit} >
            <p className={s.title}>Editing your profile information</p>
            {createField<ProfileEditFormKeys>('Full name:', Input, 'fullName', [required])}
            {createField<ProfileEditFormKeys>('About me:', Input, 'aboutMe', [required])}
            <p className={s.secondTitle}>Contacts</p>
            {createField('Facebook:', Input, 'contacts.facebook')}
            {createField('Instagram:', Input, 'contacts.instagram')}
            {createField('VK:', Input, 'contacts.vk')}
            {createField('Twitter:', Input, 'contacts.twitter')}
            {createField('GitHub:', Input, 'contacts.github')}
            {createField('YouTube:', Input, 'contacts.youtube')}
            {createField('Web site:', Input, 'contacts.website')}
            {createField('Main link:', Input, 'contacts.mainLink')}
            <div className={`${s.formItem} ${s.lookingJob}`}>
                <p className={s.fieldTitle}>Looking for a job:</p>
                <Field component={Input} name='lookingForAJob' type='checkbox' />
            </div>
            {createField<ProfileEditFormKeys>('Job search details:', Input, 'lookingForAJobDescription', )}
            {error && <div className={s.summaryError}>{error}</div>}
            <button className={s.save}>Save</button>
        </form>
    )
}

export default reduxForm<ProfileType>({form: 'editProfile', enableReinitialize: true})(ProfileEditDataForm);