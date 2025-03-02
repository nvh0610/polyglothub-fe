import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationButtons({ pagination, onPageChange, sx }) {
  return (
    <Stack spacing={2} alignItems="center" sx={sx}>
      <Pagination
        count={pagination.total_page || 1} // Đảm bảo có giá trị
        page={pagination.page || 1} // Nếu không có giá trị, mặc định là 1
        onChange={(event, newPage) => {
          console.log("New Page Clicked:", newPage); // Kiểm tra sự kiện click
          onPageChange(event, newPage);
        }}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}
