import React from "react";
import s from "./../Dialogs.module.css";
import { NavLink } from "react-router-dom";

const DialogItem = (props) => {
  return (
    <div className={s.dialog}>
      <img src={props.imgUrl} />
      <NavLink to={`/dialogs/${props.urlId}`}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;
