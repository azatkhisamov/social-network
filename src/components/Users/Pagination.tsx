import React, { useState } from "react";
import s from "./Users.module.css";
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type PropsType = {
  totalCount: number
  countUsers: number
  onPaginationClick: (numberPage: number) => void
  currentPage: number
}

const PaginationControlled: React.FC<PropsType> = (props: PropsType) => {
  
  let amountPages = Math.ceil(props.totalCount / props.countUsers);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    props.onPaginationClick(value);
  };

  return (
    <div className={s.pagination}>
      <Stack spacing={2}>
        <Pagination count={amountPages} page={props.currentPage} onChange={handleChange} />
      </Stack>
    </div>
  );
};

export default PaginationControlled;
