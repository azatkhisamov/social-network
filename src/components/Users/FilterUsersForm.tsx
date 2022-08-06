import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import s from "./Users.module.css";


type PropsType = {
    filterUsers: (term: string, friend: null | boolean) => void
    isAuth: boolean
    query: any
}

type InitialValuesType = {
    term: string
    friend: 'null' | 'true' | 'false'
}

const FilterUsersForm: React.FC<PropsType> = (props) => {

    const initialValues: InitialValuesType = {
        term: props.query.term,
        friend: props.query.friend === false ? 'false' : props.query.friend === true ? 'true' : 'null'
    }

    return (
        <Formik initialValues={initialValues} onSubmit={(values, { setSubmitting }) => {
            props.filterUsers(values.term, values.friend === 'null' ? null : values.friend === 'true' ? true : false);
            setSubmitting(false);
        }}>
            <Form>
                <Field name='term' type='text' placeholder='Найдите пользователя' className={s.filterForm} />
                {props.isAuth && <Field name='friend' as='select' className={s.filterForm}>
                    <option value="null">Все</option>
                    <option value="true">Только друзья</option>
                    <option value="false">Все, кроме друзей</option>
                </Field>}
                <button type="submit">Найти</button>
            </Form>
        </Formik>
    )
}

export default FilterUsersForm;