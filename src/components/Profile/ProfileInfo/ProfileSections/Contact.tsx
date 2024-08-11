import React, { useState, useEffect } from "react";
import s from "../ProfileInfo.module.css";

type PropsType = {
  key: string
  site: string
  url: string | null
}

const Contact: React.FC<PropsType> = (props: PropsType) => {
  return (
    <>
      <div className={s.contact}>
        {props.site}: {props.url ? props.url : 'Нет информации'}
      </div>
    </>
  );
};

export default Contact;