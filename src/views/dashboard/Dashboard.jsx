import AppAppBar from "../../components/base/AppAppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CustomizedTables from "./CustomizeTable";
import Footer from "../../components/common/Footer";
export default function Dashboard() {
    return (
      <Stack
        sx={{
          background: "url(/bgr.png)",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <AppAppBar name="Ha Nguyen" currentPage="plan" />
        <Box id="hero" sx={{ width: "100%" }}>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
                alignSelf: "center",
                textAlign: "center",
                fontSize: "32px",
                fontWeight: "700",
              }}
            >
              KẾ HOẠCH ĐẤU GIÁ
            </Typography>
            <Box
              sx={{
                mt: 3,
                padding: 5,
                alignSelf: "center",
                width: "100%",
                bgcolor: "rgba(255, 255, 255, 0.3)",
                backgroundSize: "cover",
                borderRadius: "10px",
                boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.02)`,
              }}
            >
              <CustomizedTables />
            </Box>
          </Container>
        </Box>
        <Footer />
      </Stack>
    );
  }
  