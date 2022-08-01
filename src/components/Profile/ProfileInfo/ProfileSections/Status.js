import React, { useState, useEffect } from "react";
import s from "../ProfileInfo.module.css";

const Status = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEdit = () => {
    if (props.authId === props.profileId) {
      setEditMode(true);
    }
  };

  const deactivateEdit = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <>
      {!editMode ? (
        <span className={s.status} onClick={activateEdit}>{props.status || "Статус"}</span>
      ) : (
        <input
          onChange={onStatusChange}
          autoFocus={true}
          onBlur={deactivateEdit}
          value={status}
        ></input>
      )}
    </>
  );
};

export default Status;
