import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.MuiTableCell-head`]: {
    fontSize: 17,
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
    textAlign: "center", // Căn giữa tiêu đề cột
  },
  [`&.${TableCell.body}`]: {
    fontSize: 20,
    textAlign: "center", // Căn giữa nội dung ô
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "#c4e1ff",
    color: theme.palette.common.white,
  },
}));

export default function CustomTable({ data }) {
  const columns = [
    { key: "stt", label: "STT", align: "center" }, // Cột STT
    ...Object.keys(data[0] || {}).map((key) => ({
      key,
      label: key
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      align: "center",
    })),
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ tableLayout: "auto", width: "100%" }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column.key} align={column.align || "left"}>
                {column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow key={index}>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.key}
                  align={column.align || "left"}
                >
                  {column.key === "stt"
                    ? index + 1
                    : typeof row[column.key] === "boolean"
                    ? row[column.key]
                      ? "Yes"
                      : "No"
                    : row[column.key]}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
