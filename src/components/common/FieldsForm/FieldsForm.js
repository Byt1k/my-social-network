import s from './FieldsForm.module.css';

export const Input = ({input, meta, ...props}) => {
    return (
        <div className={meta.touched && meta.error && s.error + ' ' + s.inputBlock }>
            <input {...input} {...props} />
            <p className={s.errorDesc}>{meta.touched && meta.error && meta.error}</p>
        </div>
    )
}

export const Textarea = ({input, ...props}) => {
    return (
        <textarea {...input} {...props} />
    )
}

