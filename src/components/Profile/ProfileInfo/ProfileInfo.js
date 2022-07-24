import React from "react";
import s from "./ProfileInfo.module.css";
import avatar from "../../../assets/images/147144.png";
import Preloader from "../../common/Preloader/Preloader";

const ProfileInfo = (props) => {
  if (props.profile.length === 0) {
    return <Preloader />;
  }
  return (
    <React.Fragment>
      <div className={s.imageHead}></div>
      <div className={s.info}>
        <div className={s.avatar}>
        <img
            src={
              props.profile.photos.large ? props.profile.photos.large : avatar
            }
          />
        </div>
        <div className={s.description}>
          <p>{props.profile.fullName}</p>
          <p>{props.profile.aboutMe}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileInfo;
