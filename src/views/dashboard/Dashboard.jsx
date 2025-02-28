import AppAppBar from "../../components/base/AppAppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CustomTable from "./CustomizeTable";
import ChartComponent from "./Chart";
import Footer from "../../components/common/Footer";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

const data = [
  {
    username: "User1",
    number_correct: 50,
    number_wrong: 20,
    precention: 100,
  },
  {
    username: "User2",
    number_correct: 100,
    number_wrong: 80,
    precention: 50,
  },
  {
    username: "User3",
    number_correct: 75,
    number_wrong: 25,
    precention: 20,
  },
  {
    username: "User1",
    number_correct: 50,
    number_wrong: 20,
    precention: 100,
  },
  {
    username: "User2",
    number_correct: 100,
    number_wrong: 80,
    precention: 50,
  },
  {
    username: "User3",
    number_correct: 75,
    number_wrong: 25,
    precention: 20,
  },
  {
    username: "User1",
    number_correct: 50,
    number_wrong: 20,
    precention: 100,
  },
  {
    username: "User2",
    number_correct: 100,
    number_wrong: 80,
    precention: 50,
  },
  {
    username: "User3",
    number_correct: 75,
    number_wrong: 25,
    precention: 20,
  },
  {
    username: "User1",
    number_correct: 50,
    number_wrong: 20,
    precention: 100,
  },
  {
    username: "User2",
    number_correct: 100,
    number_wrong: 80,
    precention: 50,
  },
  {
    username: "User3",
    number_correct: 75,
    number_wrong: 25,
    precention: 20,
  },
];

const leaderboardData = [
  {
    name: "Muhammad Zahid",
    score: 254,
  },
  {
    name: "Sanna Khaaar",
    score: 200,
  },
  {
    name: "Atif Ahmed",
    score: 150,
  },
];

const wrongVocabularies = [
  {
    word: "apple",
    number_wrong: 15,
  },
  {
    word: "banana",
    number_wrong: 12,
  },
  {
    word: "orange",
    number_wrong: 9,
  }
];

export default function Dashboard() {
  return (
    <Stack
      sx={{
        background: "url(/bgr.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AppAppBar name="nvh0610" currentPage="plan" />
      <Container>
        <Box id="hero" sx={{ width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              pt: { xs: 0, sm: 0 },
              pb: { xs: 8, sm: 12 },
            }}
          >
            {/* Căn giữa tiêu đề */}
            <Box sx={{ display: "flex", justifyContent: "left" }}>
              <Typography
                variant="h2"
                color="#ef0000"
                sx={{
                  my: 2,
                  textAlign: "left",
                  fontSize: "25px",
                  fontWeight: "600",
                  textDecoration: "underline", // Gạch chân
                  width: "100%",
                }}
              >
                Daily Report Flashcards
              </Typography>
            </Box>

            {/* Thêm biểu đồ vào đây */}
            <Box sx={{ my: 4 }}>
              <ChartComponent data={data} />
            </Box>

            {/* Bố cục 2/3 - 1/3 */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomTable data={data} />
              </Grid>
              
              {/* Hai bảng nhỏ có tiêu đề và cách nhau một chút */}
              <Grid container spacing={4} sx={{ mt: 4 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="h2"
                    color="#F54949"
                    sx={{
                      my: 2,
                      textAlign: "left",
                      fontSize: "25px",
                      fontWeight: "600",
                      textDecoration: "underline", // Gạch chân
                      width: "100%",
                    }}
                  >
                    Leaderboard
                  </Typography>
                  <CustomTable data={leaderboardData} />
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    variant="h2"
                    color="#F54949"
                    sx={{
                      my: 2,
                      textAlign: "left",
                      fontSize: "25px",
                      fontWeight: "600",
                      textDecoration: "underline", // Gạch chân
                      width: "100%",
                    }}
                  >
                    Wrong Vocabulary
                  </Typography>
                  <CustomTable data={wrongVocabularies} />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Stack>
  );
}

