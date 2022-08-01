import React from 'react'
import s from './Header.module.css'
import { NavLink } from "react-router-dom"

const Header = (props) => {
    // debugger

    const logout = () => {
        props.logout();
    }

    return(
        <header className={s.header}>
            <img src='https://static.rfstat.com/renderforest/images/v2/logo-homepage/gradient_3.png' />
            <div className={s.auth}>
                {props.auth.isAuth ? <button onClick={logout}>Logout</button> : 
                <NavLink to='/login'>
                    <button>Login</button>
                </NavLink>}
            </div>
        </header>
    )
}

export default Header