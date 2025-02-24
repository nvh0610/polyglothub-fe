import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const data = [
  { username: "user1", num_correct_answer: 10, num_wrong_answer: 2, percent: "83.3%", date: "2024-02-24" },
  { username: "user2", num_correct_answer: 15, num_wrong_answer: 5, percent: "75%", date: "2024-02-23" },
  { username: "user3", num_correct_answer: 8, num_wrong_answer: 4, percent: "66.7%", date: "2024-02-22" },
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Username</b></TableCell>
            <TableCell align="right"><b>Correct Answers</b></TableCell>
            <TableCell align="right"><b>Wrong Answers</b></TableCell>
            <TableCell align="right"><b>Percentage</b></TableCell>
            <TableCell align="right"><b>Date</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.username}</TableCell>
              <TableCell align="right">{row.num_correct_answer}</TableCell>
              <TableCell align="right">{row.num_wrong_answer}</TableCell>
              <TableCell align="right">{row.percent}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
