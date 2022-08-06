import React from "react";
import s from "./Post.module.css";

type PropsType = {
  key: number
  message: string
}

const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={s.post}>
      <img className={s.avatar} src="https://tinypng.com/images/social/website.jpg" />
      <p className={s.text}>
        {props.message}
      </p>
    </div>
  );
};

export default Post;
