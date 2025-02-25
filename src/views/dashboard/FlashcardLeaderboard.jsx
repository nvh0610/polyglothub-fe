import { Box, Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function FlashcardLeaderboard() {
    // Ví dụ mock data
    const data = [
      { name: "Muhammad Zahid", jobTitle: "Web Developer", score: 254 },
      { name: "Sanna Khaaar", jobTitle: "UI/UX Designer", score: 200 },
      { name: "Atif Ahmed", jobTitle: "Backend Dev", score: 150 },
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
          Leaderboard
        </Typography>
  
        {data.map((user, index) => (
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
            <Avatar sx={{ mr: 2 }}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.jobTitle}
              </Typography>
            </Box>
            <Box sx={{ ml: "auto", fontWeight: "bold" }}>
              {user.score} pts
            </Box>
          </Box>
        ))}
      </Box>
    );
  }
  