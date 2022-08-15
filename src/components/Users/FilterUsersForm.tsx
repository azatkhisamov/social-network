import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import s from "./Users.module.css";
import { Button, FormControl, MenuItem, NativeSelect, Select, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import SelectForm from "../../utils/Forms/SelectForm";
import InputForm from "../../utils/Forms/InputForm";


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
            {formik => {
                console.log(formik)
                return (
                    <Form>
                        <Stack spacing={1} direction={'row'}>
                            <InputForm name='term' type='text' label='Имя' />
                            {props.isAuth &&
                                <SelectForm
                                    name='friend'
                                    value={formik.values.friend}
                                >
                                    <MenuItem value="null">Все</MenuItem>
                                    <MenuItem value="true">Только друзья</MenuItem>
                                    <MenuItem value="false">Все, кроме друзей</MenuItem>
                                </SelectForm>
                            }
                            <Button type="submit" disabled={formik.isSubmitting} variant="contained" size='small'>Найти</Button>
                        </Stack>
                    </Form>)
            }}
        </Formik>
    )
}

export default FilterUsersForm;