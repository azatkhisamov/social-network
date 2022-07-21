import React from "react";
import s from "./User.module.css";
import userPhoto from "./../../../assets/images/147144.png"

const User = (props) => {
    return (
    <div className={s.user}>
      <div className={s.avatar}>
        <div>
          <img src={props.info.photos.small != null ? props.info.photos.small : userPhoto} />
        </div>
      </div>
      <div className={s.button}>
        <button onClick={() => props.followUnfollow(props.info.id)}>
          {props.info.followed === true ? "Follow" : "Unfollow"}
        </button>
      </div>
      <div className={s.description}>
        <div>{props.info.name}</div> 
        <div>
          Moscow, Russia
        </div>
        <div>{props.info.status}</div>
      </div>
    </div>
  );
};

export default User;
