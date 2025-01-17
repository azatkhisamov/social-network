import React from "react";
import { useField } from 'formik';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';


type PropsType = {
    type: string
    label: string
    name: string
}

const TextareaForm: React.FC<PropsType> = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <FormControl sx={{ width: '700px' }} fullWidth error={meta.touched && meta.error ? true : false}>
            <InputLabel htmlFor={props.name}>{label}</InputLabel>
            <OutlinedInput multiline rows={2} id={props.name} {...props} {...field} label={label}/>
            {meta.touched && meta.error ?
            (<FormHelperText id={props.name}>{meta.error}</FormHelperText>) : null
            }
        </FormControl>
    )
}

export default TextareaForm;