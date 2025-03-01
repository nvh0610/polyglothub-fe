import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationButtons({ pagination, onPageChange, sx }) {
  return (
    <Stack spacing={2} alignItems="center" sx={sx}>
      <Pagination
        count={pagination.total_page} // Tổng số trang
        page={pagination.page} // Trang hiện tại
        onChange={(event, newPage) => onPageChange(newPage)} // Hàm xử lý khi đổi trang
        color="primary"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}
