import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { ContactsProfileType, ProfileType } from "../../../../redux/profileReducer";
import s from "../ProfileInfo.module.css";
import Contact from "./Contact";

type PropsType = {
  profile: ProfileType 
  authId: number | null
  activateEditMode: () => void
}

const ProfileData: React.FC<PropsType> = React.memo((props: PropsType) => {
  return (
    <Stack spacing={0.5} alignItems="flex-start">
      <Typography variant="subtitle2" sx={{fontSize: '18px'}}>
        <b>Поиск работы: </b>
        {props.profile.lookingForAJob ? "Да" : "Нет"}
      </Typography>
      {props.profile.lookingForAJob &&
      <Typography variant="subtitle2" sx={{fontSize: '18px'}}>
        <b>Профессиональные умения: </b>
        {props.profile.lookingForAJobDescription || "Нет информации"}
      </Typography>}
      <Typography variant="subtitle2" sx={{fontSize: '18px'}}>
        <b>О себе: </b>
        {props.profile.aboutMe || "Отсутствует"}
      </Typography>
      <Typography variant="subtitle2" sx={{fontSize: '18px'}}>
        <b>Контакты: </b>
      </Typography>
      
      <Typography variant="subtitle2" sx={{fontSize: '18px'}}>
        {Object.keys(props.profile.contacts).map((contact) => (
          <Contact key={contact} site={contact} url={props.profile.contacts[contact as keyof ContactsProfileType]} />
        ))}
      </Typography>
      {props.authId === props.profile?.userId &&
      <Button size='small' onClick={props.activateEditMode} variant='contained' color='primary'>Изменить данные</Button>
    }
    </Stack>
  );
});

export default ProfileData;
