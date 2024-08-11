import React from "react";
import s from "./Users.module.css";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type PropsType = {
  totalCount: number
  countUsers: number
  onPaginationClick: (numberPage: number) => void
  currentPage: number
}

const PaginationControlled: React.FC<PropsType> = React.memo((props: PropsType) => {

  let amountPages = Math.ceil(props.totalCount / props.countUsers);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    props.onPaginationClick(value);
  };

  return (
    <div className={s.pagination}>
      <Stack spacing={3}>
        <Pagination count={amountPages} page={props.currentPage} onChange={handleChange}
          color="primary" variant="outlined" shape="rounded" />
      </Stack>
    </div>
  );
});

export default PaginationControlled;
