import React from 'react'
import s from './Header.module.css'
import { NavLink } from "react-router-dom"
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { ImageAspectRatioSharp } from '@mui/icons-material';

type PropsType = {
    isAuth: boolean
    logout: () => void
}

const Header: React.FC<PropsType> = (props) => {
    // debugger

    const logout = () => {
        props.logout();
    }

    return (
            <AppBar position="sticky" color='primary'>
                <Toolbar>
                    <img style={{width: '50px'}} src='https://static.rfstat.com/renderforest/images/v2/logo-homepage/gradient_3.png' />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Social network
                    </Typography>
                    <div className={s.auth}>
                        {props.isAuth ? <Button variant="text" color='inherit' size='small' onClick={logout}>Выйти</Button> :
                            <NavLink to='/login' style={{textDecoration: 'none', outline: 'none', color: 'white'}}>
                                <Button variant="text" color='inherit' size='small'>Login</Button>
                            </NavLink>}
                    </div>
                </Toolbar>
            </AppBar>
        // <header className={s.header}>
        //     <img src='https://static.rfstat.com/renderforest/images/v2/logo-homepage/gradient_3.png' />
        //     <div className={s.auth}>
        //         {props.isAuth ? <Button variant="contained" size='small' onClick={logout}>Выйти</Button> : 
        //         <NavLink to='/login'>
        //             <Button variant="contained" size='small'>Login</Button>
        //         </NavLink>}
        //     </div>
        // </header>
    )
}

export default Header