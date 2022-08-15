import React from "react";
import s from './Navbar.module.css'
import { NavLink } from "react-router-dom"
import Friends from "./Friends/Friends";
import { FriendsType } from "../../redux/navbarReducer";
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Stack } from "@mui/material";

type PropsType = {
  isAuth: boolean
  friends: Array<FriendsType>
}

const Navbar: React.FC<PropsType> = (props) => {
  return (
    <nav className={s.nav}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='primary' >
          <Toolbar>
            <Stack spacing={3} sx={{marginTop: 5, marginBottom: 5}}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <NavLink to={`/profile`}>Профиль</NavLink>
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <NavLink to='/dialogs'>Сообщения</NavLink>
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <NavLink to='/users'>Пользователи</NavLink>
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <NavLink to='/chat'>Общий чат</NavLink>
              </Typography>
              {props.isAuth && <>
                <Typography variant="h6" component="div">Friends</Typography>
                <div className={s.friends}>
                  {props.friends.map(item => <Friends key={item.id} avatarUrl={item.avatarUrl} name={item.name} />)}
                </div></>}
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
      {/* <div className={s.item}>
        <NavLink to={`/profile`}>Профиль</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/dialogs'>Сообщения</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/users'>Пользователи</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/chat'>Общий чат</NavLink>
      </div>
      <div className={s.item}>
        <a href='/feed'>Новости</a>
      </div>
      <div className={s.item}>
        <a href='/music'>Музыка</a>
      </div>
      <div className={s.item}>
        <a href='/settings'>Настройки</a>
      </div>
      {props.isAuth && <h2>Friends</h2><div className={s.friends}>
        {props.friends.map(item => <Friends key={item.id} avatarUrl={item.avatarUrl} name={item.name} />)}
      </div>} */}
    </nav>
  );
};

export default Navbar;
