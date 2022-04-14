import {Field, Form, Formik, FormikHelpers} from "formik";
import s from './UsersSearchForm.module.css'
import {FC} from "react";

export type ValuesType = {
    term: string
}

type PropsType = {
    onSubmitUsersSearchForm: (values: ValuesType, { setSubmitting }: FormikHelpers<ValuesType>) => void
    term: string
}

export const UsersSearchForm: FC<PropsType> = ({onSubmitUsersSearchForm, term}) => {
    return (
        <Formik initialValues={{term: term}} onSubmit={onSubmitUsersSearchForm}>
            <Form className={s.form}>
                <Field name="term" placeholder="Enter username to search..."/>
                <button type="submit">Search</button>
            </Form>
        </Formik>
    )
}