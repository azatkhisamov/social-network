import React, { ChangeEvent } from "react";
import s from "../ProfileInfo.module.css";
import avatar from "../../../../assets/images/147144.png";

type PropsType = {
  photo: string | null
  savePhoto: (imageFile: any) => void
  authId: number | null
  profileId: number
}

const Avatar: React.FC<PropsType> = (props: PropsType) => {
  const savePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
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
