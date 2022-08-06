import React from "react";
import s from "./User.module.css";
import userPhoto from "./../../../assets/images/147144.png";
import { NavLink } from "react-router-dom";
import { UsersType } from "../../../redux/usersReducer";

type PropsType = {
  key: number
  user: UsersType
  followUser: (userID: number) => void
  unFollowUser: (userID: number) => void
  followingInProgress: Array<number>
  authID: number | null
}

const User: React.FC<PropsType> = (props: PropsType) => {
  return (
    <div className={s.user}>
      <div className={s.avatar}>
        <div>
          <NavLink to={props.user.id !== props.authID ? `/profile/${props.user.id}` : '/profile'}>
            <img
              src={
                props.user.photos.small != null
                  ? props.user.photos.small
                  : userPhoto
              }
            />
          </NavLink>
        </div>
      </div>
      <div className={s.button}>
        <button disabled={props.followingInProgress.some(id => id == props.user.id)} onClick={() => {
          props.user.followed ? props.unFollowUser(props.user.id) : props.followUser(props.user.id)
        }}>
          {props.user.followed === true ? "Удалить" : "Добавить"}
        </button>
      </div>
      <div className={s.description}>
        <div>{props.user.name}</div>
        <div>Moscow, Russia</div>
        <div>{props.user.status}</div>
      </div>
    </div>
  );
};

export default User;
