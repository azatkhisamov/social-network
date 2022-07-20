import React from "react";
import s from './ProfileInfo.module.css';


const ProfileInfo = (props) => {
  return (
    <React.Fragment>
      <div className={s.imageHead}></div>
      <div className={s.info}>
        <div className={s.avatar}> 
          <img src='https://cdn.europosters.eu/image/1300/posters/wonder-woman-1984-solo-i97792.jpg' />
        </div>
        <div className={s.description}>
          <p>Мне 29 лет. Живу в Астрахани. Болею за фк Торпедо Москва</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileInfo;
