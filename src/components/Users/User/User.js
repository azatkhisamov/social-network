import React from "react";
import s from "./User.module.css";
import userPhoto from "./../../../assets/images/147144.png";
import { NavLink } from "react-router-dom";

const User = (props) => {

  return (
    <div className={s.user}>
      <div className={s.avatar}>
        <div>
          <NavLink to={`/profile/${props.info.id}`}>
            <img
              src={
                props.info.photos.small != null
                  ? props.info.photos.small
                  : userPhoto
              }
            />
          </NavLink>
        </div>
      </div>
      <div className={s.button}>
        <button onClick={() => {
          props.info.followed ? props.unFollowUser(props.info.id) : props.followUser(props.info.id)
        }}>
          {props.info.followed === true ? "Unfollow" : "Follow"}
        </button>
      </div>
      <div className={s.description}>
        <div>{props.info.name}</div>
        <div>Moscow, Russia</div>
        <div>{props.info.status}</div>
      </div>
    </div>
  );
};

export default User;
