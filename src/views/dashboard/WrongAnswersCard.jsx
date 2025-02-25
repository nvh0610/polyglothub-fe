import { Box, Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";


export default function WrongAnswersCard() {
    // Mock data
    const data = [
      { word: "Accomodation", timesWrong: 15 },
      { word: "Receive", timesWrong: 12 },
      { word: "Indispensible", timesWrong: 9 },
    ];
  
    return (
      <Box
        sx={{
          p: 3,
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Most Wrong Answers
        </Typography>
  
        {data.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              p: 1,
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "#f9f9f9",
              },
            }}
          >
            <Avatar sx={{ mr: 2, bgcolor: "error.main" }}>
              {item.word.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {item.word}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.timesWrong} times
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    );
  }