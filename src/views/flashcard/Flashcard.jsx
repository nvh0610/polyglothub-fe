import { Typography, Box, Stack } from "@mui/material";
import Footer from "../../components/common/Footer";
import AppAppBar from "../../components/base/AppAppBar";

export default function Flashcard() {
  return (
    <Stack
      sx={{
        background: "url(/bgr.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <AppAppBar name="nvh0610" currentPage="plan" />

      <Box display="flex" flexGrow={1} justifyContent="center" alignItems="center">
        <Typography variant="h5" color="textSecondary">
          This feature is being updated.......
        </Typography>
      </Box>

      <Footer />
    </Stack>
  );
}
