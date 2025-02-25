import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import React from "react";

export default function CustomizedTables() {
  // Mock data
  const data = [
    { username: "User1", monthlyBudget: 50, totalClaimed: 20, amneyUser: true },
    { username: "User2", monthlyBudget: 100, totalClaimed: 80, amneyUser: false },
    { username: "User3", monthlyBudget: 75, totalClaimed: 25, amneyUser: true },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Username
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Monthly Budget
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Total Claimed
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Amney User
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell align="center">{row.username}</TableCell>
              <TableCell align="center">${row.monthlyBudget}</TableCell>
              <TableCell align="center">${row.totalClaimed}</TableCell>
              <TableCell align="center">
                {row.amneyUser ? "Yes" : "No"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
