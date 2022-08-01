import React from "react";
import s from "./FormControls.module.css";

export const Textarea = ({ input, label, meta }) => {
  const hasError = meta.touched && meta.error;
  return (
    <>
      <div className={hasError ? s.error : s.withoutError}>
        <textarea {...input} placeholder={label}></textarea>
        {hasError && <span>{meta.error}</span>}
      </div>
    </>
  );
};

export const Input = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <>
      <div className={hasError ? s.error : s.withoutError}>
        <input {...input} {...props}></input>
        {hasError && <span>{meta.error}</span>}
      </div>
    </>
  );
};
