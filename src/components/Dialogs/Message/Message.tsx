import React from "react";
import s from "./../Dialogs.module.css";

type PropsType = {
  key: number
  message: string
  writer: string
}

const Message: React.FC<PropsType> = (props) => {
  return (
    <div>
      <div className={s.message + " " + props.writer}>{props.message}</div>
    </div>
  );
};

export default Message;
