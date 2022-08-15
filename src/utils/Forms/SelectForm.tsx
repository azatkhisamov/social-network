import React from "react";
import { useField } from 'formik';
import { TextField } from "@mui/material";


type PropsType = {
    name: string
    children: React.ReactNode
    value: 'null' | 'true' | 'false'
}

const SelectForm: React.FC<PropsType> = ({ value, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <TextField id="select" size="small" select {...field} value={value} {...props} />
    )
}

export default SelectForm;