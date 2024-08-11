import { Typography } from "@mui/material";
import React, { useState, useEffect, ChangeEvent } from "react";
import s from "../ProfileInfo.module.css";

type PropsType = {
  status: string
  authId: number | null
  updateStatus: (status: string) => void
  profileId: number
}

const Status: React.FC<PropsType> = (props: PropsType) => {
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

  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  return (
    <>
      {!editMode ? (
        <Typography variant="subtitle2" gutterBottom component="div" onClick={activateEdit}>{props.status || null}</Typography>
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
