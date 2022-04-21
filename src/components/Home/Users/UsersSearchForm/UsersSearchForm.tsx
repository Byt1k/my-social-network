import {Field, Form, Formik, FormikHelpers} from "formik";
import s from './UsersSearchForm.module.css'
import {FC} from "react";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../../../redux/selectors/users-selectors";

export type ValuesType = {
    term: string
}

type PropsType = {
    onSubmitUsersSearchForm: (values: ValuesType, { setSubmitting }: FormikHelpers<ValuesType>) => void
}

export const UsersSearchForm: FC<PropsType> = ({onSubmitUsersSearchForm}) => {
    const term = useSelector(getUsersFilter)
    return (
        <Formik enableReinitialize initialValues={{term: term}} onSubmit={onSubmitUsersSearchForm}>
            <Form className={s.form}>
                <Field name="term" placeholder="Enter username to search..."/>
                <button type="submit">Search</button>
            </Form>
        </Formik>
    )
}