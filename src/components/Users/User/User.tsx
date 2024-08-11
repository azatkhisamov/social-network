import React from "react";
import s from "./User.module.css";
import { NavLink } from "react-router-dom";
import { UsersType } from "../../../redux/usersReducer";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea, CardActions, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

type PropsType = {
  key: number
  user: UsersType
  followUser: (userID: number) => void
  unFollowUser: (userID: number) => void
  followingInProgress: Array<number>
  authID: number | null
}

const User: React.FC<PropsType> = React.memo((props: PropsType) => {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <CardContent>
          <Stack spacing={2} direction='row'>
            <NavLink to={props.user.id !== props.authID ? `/profile/${props.user.id}` : '/profile'}>
              <Avatar sx={{ width: 120, height: 120 }} alt={props.user.name} src={props.user.photos.small ? props.user.photos.small : undefined} />
            </NavLink>
            <Stack spacing={2}>
              <Typography gutterBottom variant="h5" component="div">
                {props.user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.user.status}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <LoadingButton loading={props.followingInProgress.some(id => id == props.user.id)}
          variant="outlined"
          onClick={() => {
            props.user.followed ? props.unFollowUser(props.user.id) : props.followUser(props.user.id)
          }}>
          {props.user.followed === true ? "Отписаться" : "Подписаться"}
        </LoadingButton>
      </CardActions>
    </Card>
  );
});

export default User;
