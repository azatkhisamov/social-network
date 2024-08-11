import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import s from "./Post.module.css";
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';


type PropsType = {
  key: number
  message: string
  fullName: string
}

const Post: React.FC<PropsType> = (props) => {
  return (
    <>
      <Stack spacing={2} direction='row' sx={{ width: '700px' }}>
        <Avatar sx={{ bgcolor: deepPurple[500], width: '70px', height: '70px' }} alt={props.fullName} />
        <Stack spacing={1}>
          <Typography variant="h6">
            {props.fullName}
          </Typography>
          <Typography variant="subtitle1">
            {props.message}
          </Typography>
        </Stack>
      </Stack>
      <Divider sx={{ width: '700px' }} />
    </>
  );
};

export default Post;

{/* <div className={s.post}>
      <img className={s.avatar} src="https://tinypng.com/images/social/website.jpg" />
      <p className={s.text}>
        {props.message}
      </p>
    </div> */}