import React from "react";
import s from "./../Dialogs.module.css";
import { NavLink } from "react-router-dom";

type PropsType = {
  key: number
  urlId: number
  name: string
  imgUrl: string
}

const DialogItem: React.FC<PropsType> = (props) => {
  return (
    <div className={s.dialog}>
      <img src={props.imgUrl} />
      <NavLink to={`/dialogs/${props.urlId}`}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;
