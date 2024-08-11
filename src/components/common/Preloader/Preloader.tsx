import React from "react";
import loadingGIF from '../../../assets/images/Loading.gif';
import s from "./Preloader.module.css";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Stack } from "@mui/system";

const Preloader: React.FC = () => {
    return (
        <Stack sx={{ width: '100px', height: '100px', display: 'flex', justifyContent: "center",
        alignItems: "center" }}>
            <CircularProgress size={100} />
        </Stack>
    )
}

export default Preloader;