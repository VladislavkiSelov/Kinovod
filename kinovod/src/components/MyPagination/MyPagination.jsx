import React from "react";
import Pagination from '@mui/material/Pagination';
import { Stack } from "@mui/material";
import style from "./MyPagination.module.scss";

function MyPagination({ totalPages, handlePageChange }) {
  return (
    <Stack spacing={2}>
      <Pagination onChange={handlePageChange} count={totalPages} shape="rounded" className={style.pagination} />
    </Stack>
  );
}

export default MyPagination;
