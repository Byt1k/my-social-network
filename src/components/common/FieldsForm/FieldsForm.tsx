// @ts-ignore
import s from './FieldsForm.module.css';
import {Field, WrappedFieldProps} from "redux-form";
import {FC, InputHTMLAttributes} from "react";
import {ValidatorType} from "../../../utils/validators";

const FormControl: FC<WrappedFieldProps> = ({meta: {touched, error}, children}) => {
    return (
        <div className={touched && error && s.error + ' ' + s.inputBlock}>
            {children}
            <p className={s.errorDesc}>{touched && error && error}</p>
        </div>
    )
}

export const Input: FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>
    )
}

export const Textarea: FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps} />
        </FormControl>
    )
}

export const createField = <T extends string>(title: string,
                                              component: string | FC<WrappedFieldProps>,
                                              name: T,
                                              validators: Array<ValidatorType> = [],
                                              props: InputHTMLAttributes  = {type: 'text'}) => {
    if (props.type === 'checkbox') {
        return (
            <div className={s.checkboxBlock}>
                <Field component={component} name={name} id={name} {...props}/>
                <label htmlFor={name}>{title}</label>
            </div>
        )
    }
    return (
        <div className={s.inputBlock}>
            <p>{title}</p>
            <Field component={component} name={name} validate={validators} {...props}/>
        </div>
    )
}

