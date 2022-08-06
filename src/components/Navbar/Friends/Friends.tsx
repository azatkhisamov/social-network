import React from "react";
import s from "./Friends.module.css";

type PropsType = {
  key: number
  name: string
  avatarUrl: string
}

const Friends: React.FC<PropsType> = (props) => {
  return (
    <div className={s.friend}>
      <div>
        <img src={props.avatarUrl} />
      </div>
      <div>{props.name}</div>
    </div>
  );
};

export default Friends;
