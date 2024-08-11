import React, { ChangeEvent } from "react";
import s from "../ProfileInfo.module.css";
import avatar from "../../../../assets/images/147144.png";
import { Avatar, Button, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { Stack } from "@mui/system";


type PropsType = {
  photo: string | null
  savePhoto: (imageFile: any) => void
  authId: number | null
  profileId: number
  fullName: string
}

const UserAvatar: React.FC<PropsType> = React.memo((props: PropsType) => {
  const savePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      props.savePhoto(event.target.files[0]);
    }
  };

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <Avatar alt={props.fullName} src={props.photo ? props.photo : undefined}
        sx={{ width: 250, height: 250 }}></Avatar>
      {props.authId === props.profileId ? 
      (<Button variant="contained" component="label">
        Загрузить новое фото
        <input hidden accept="image/*" type="file" onChange={savePhoto} />
      </Button>) : null}
    </Stack>
  );
});

export default UserAvatar;
