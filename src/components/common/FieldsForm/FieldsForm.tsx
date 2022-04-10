// @ts-ignore
import s from './FieldsForm.module.css';
import {Field, WrappedFieldArrayProps, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {FC} from "react";
import {ValidatorType} from "../../../utils/validators";

const FormControl: FC<WrappedFieldProps> = ({meta: {touched, error}, children}) => {
    return (
        <div className={touched && error && s.error + ' ' + s.inputBlock}>
            {children}
            <p className={s.errorDesc}>{touched && error && error}</p>
        </div>
    )
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>
    )
}

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps} />
        </FormControl>
    )
}

export function createField<T extends string>(title: string,
                                              component: string | FC<WrappedFieldProps>,
                                              name: T,
                                              validators: Array<ValidatorType> = [],
                                              restProps = {type: 'text'}) {
    if (restProps.type === 'checkbox') {
        return (
            <div className={s.checkboxBlock}>
                <Field component={component} name={name} id={name} {...restProps}/>
                <label htmlFor={name}>{title}</label>
            </div>
        )
    }
    return (
        <div className={s.inputBlock}>
            <p>{title}</p>
            <Field component={component} name={name} validate={validators} {...restProps}/>
        </div>
    )
}

