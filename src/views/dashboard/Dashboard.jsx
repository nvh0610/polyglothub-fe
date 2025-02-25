import AppAppBar from "../../components/base/AppAppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CustomizedTables from "./CustomizeTable";
import FlashcardLeaderboard from "./FlashcardLeaderboard";
import WrongAnswersCard from "./WrongAnswersCard";
import Footer from "../../components/common/Footer";
import Grid from "@mui/material/Grid";

export default function Dashboard() {
  return (
    <Stack
      sx={{
        background: "url(/bgr.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AppAppBar name="Ha Nguyen" currentPage="plan" />
      <Box id="hero" sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            pt: { xs: 10, sm: 14 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Typography
            variant="h2"
            color="text.secondary"
            sx={{
              my: 3,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              textAlign: "center",
              fontSize: "32px",
              fontWeight: "700",
              justifyContent: "center",
            }}
          >
            KẾ HOẠCH ĐẤU GIÁ
          </Typography>

          {/* Bố cục 2/3 - 1/3 */}
          <Grid container spacing={2}>
            {/* Bên trái (2/3): Bảng xếp hạng chính */}
            <Grid xs={12} md={8}>
              <Box
                sx={{
                  mt: 3,
                  p: 4,
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                  borderRadius: "10px",
                  boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)",
                }}
              >
                <CustomizedTables />
              </Box>
            </Grid>

            {/* Bên phải (1/3): 2 bảng con xếp dọc */}
            <Grid xs={12} md={4}>
              <Grid container spacing={2} direction="column">
                {/* Leaderboard Flashcard (nửa trên) */}
                <Grid xs={6}>
                  <Box
                    sx={{
                      p: 3,
                      bgcolor: "rgba(255, 255, 255, 0.3)",
                      borderRadius: "10px",
                      boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)",
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Flashcard Leaderboard
                    </Typography>
                    <FlashcardLeaderboard />
                  </Box>
                </Grid>
                {/* Leaderboard từ sai nhiều (nửa dưới) */}
                <Grid xs={6}>
                  <Box
                    sx={{
                      p: 3,
                      bgcolor: "rgba(255, 255, 255, 0.3)",
                      borderRadius: "10px",
                      boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)",
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Most Wrong Answers Leaderboard
                    </Typography>
                    <WrongAnswersCard />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </Stack>
  );
}
