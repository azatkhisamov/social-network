import React, { useState, useEffect } from "react";
import { ContactsProfileType, ProfileType } from "../../../../redux/profileReducer";
import s from "../ProfileInfo.module.css";
import Contact from "./Contact";

type PropsType = {
  profile: ProfileType 
  authId: number | null
  activateEditMode: () => void
}

const ProfileData: React.FC<PropsType> = (props: PropsType) => {
  return (
    <>
      <div>
        <b>Поиск работы: </b>
        {props.profile.lookingForAJob ? "Да" : "Нет"}
      </div>
      {props.profile.lookingForAJob &&
      <div>
        <b>Профессиональные умения: </b>
        {props.profile.lookingForAJobDescription || "Отсутствует"}
      </div>}
      <div>
        <b>О себе: </b>
        {props.profile.aboutMe || "Отсутствует"}
      </div>
      <div>
        <b>Контакты: </b>
      </div>
      <div>
        {Object.keys(props.profile.contacts).map((contact) => (
          <Contact key={contact} site={contact} url={props.profile.contacts[contact as keyof ContactsProfileType]} />
        ))}
      </div>
      {props.authId === props.profile?.userId &&
      <div>
        <button onClick={props.activateEditMode}>Изменить данные</button>
      </div>
      }
    </>
  );
};

export default ProfileData;
