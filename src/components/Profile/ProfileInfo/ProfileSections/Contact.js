import React, { useState, useEffect } from "react";
import s from "../ProfileInfo.module.css";

const Contact = (props) => {
  return (
    <>
      <div className={s.contact}>
        {props.site}: {props.url}
      </div>
    </>
  );
};

export default Contact;