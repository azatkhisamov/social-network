import React from "react";
import s from "./Friends.module.css";

const Friends = (props) => {
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
