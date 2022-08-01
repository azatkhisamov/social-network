import React from "react";
import s from "../ProfileInfo.module.css";
import avatar from "../../../../assets/images/147144.png";

const Avatar = (props) => {
  const savePhoto = (event) => {
    if (event.target.files.length) {
      props.savePhoto(event.target.files[0]);
    }
  };

  return (
    <>
      <img src={props.photo ? props.photo : avatar} />
      <div>
        {props.authId === props.profileId ? (
          <div>
            <label htmlFor='image'>Изменить аватар</label>
            <input type="file" onChange={savePhoto} id="image" />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Avatar;
