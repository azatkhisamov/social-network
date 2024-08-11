import React, { useState } from "react";
import { useField } from 'formik';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


type PropsType = {
    label: string
    name: string
}

const PasswordForm: React.FC<PropsType> = ({ label, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const [field, meta] = useField(props);
    return (
        <FormControl size="small" sx={{ width: 350 }} error={meta.touched && meta.error ? true : false}>
            <InputLabel htmlFor={props.name}>{label}</InputLabel>
            <OutlinedInput size="small" id={props.name} {...props} {...field} type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                } label={label} />
            {meta.touched && meta.error ?
                (<FormHelperText id={props.name}>{meta.error}</FormHelperText>) : null
            }
        </FormControl>
    )
}

export default PasswordForm;