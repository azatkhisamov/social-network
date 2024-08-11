import React, { useEffect } from "react";
import s from './Navbar.module.css'
import { NavLink } from "react-router-dom"
import { requestFriends } from "../../redux/navbarReducer";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Avatar, AvatarGroup, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChatIcon from '@mui/icons-material/Chat';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStateType } from "../../redux/redux-store";
import { getIsAuth } from "../../redux/authSelectors";
import CircularProgress from '@mui/material/CircularProgress';


const Navbar: React.FC = React.memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector(getIsAuth);
  const totalCountFriends = useSelector((state: AppStateType) => state.navbar.totalCountFriends);
  const isFetching = useSelector((state: AppStateType) => state.navbar.isFetching);
  const changingFriends = useSelector((state: AppStateType) => state.usersPage.changingFriends);
  const friends = useSelector((state: AppStateType) => state.navbar.friends);

  useEffect(() => {
    debugger
    dispatch(requestFriends());
  }, [changingFriends, isAuth])

  return (
    <Box flex={2} p={2}>
      <div className={s.nav}>
        <List>
          <NavLink to={`/profile`}>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary='Профиль' />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to={`/dialogs`}>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary='Сообщения' />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to={`/users`}>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText primary='Пользователи' />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to={`/chat`}>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText primary='Общий чат' />
              </ListItemButton>
            </ListItem>
          </NavLink>
        </List>
        {(isAuth && !!friends.length) && (isFetching ?
          <CircularProgress /> :
          <>
            <Typography variant="h6" component="div">Подписчики</Typography>
            <AvatarGroup sx={{justifyContent: "center", marginTop: '15px'}} total={totalCountFriends}>
              {friends.map((friend) => <NavLink to={`/profile/${friend.id}`} key={friend.id}><Avatar alt={friend.name} src={friend.photos?.large ? friend.photos?.large : undefined} /></NavLink>)}
            </AvatarGroup>
          </>)}
      </div>
    </Box >
  );
});

export default Navbar;
