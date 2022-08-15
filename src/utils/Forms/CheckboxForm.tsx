import React from "react";
import { useField } from 'formik';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


type PropsType = {
    type: string
    label: string
    name: string
}

const CheckboxForm: React.FC<PropsType> = ({ label, ...props }) => {

    const [field, meta] = useField(props);
    return (
        <FormControl component="fieldset">
            <FormControlLabel
                value="start"
                control={<Checkbox {...props}
                {...field} />}
                label={label}
                labelPlacement="start"
        />
        </FormControl>
    )
}

export default CheckboxForm;