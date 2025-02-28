import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Container,
} from "@mui/material";
import backgroundImage from "../../assets/category.png";
import Stack from "@mui/material/Stack";
import AppAppBar from "../../components/base/AppAppBar";
import Footer from "../../components/common/Footer";


export default function Category() {
  const categoryList = [
    { id : 1, name: "ENGLISH VOCABULARY", image: backgroundImage },
    { id : 2, name: "INTERMEDIATE ENGLISH", image: backgroundImage },
    { id : 3, name: "TOEIC", image: backgroundImage },
    {
      id : 4, name: "TOEIC Culture vocabulary Oxford Culture vocabulary Oxford",
      image: backgroundImage,
    },
    { id : 5, name: "IELTS", image: backgroundImage },
    { id : 6, name: "PHRASAL VERBS Theory", image: backgroundImage },
    { id : 7, name: "Adjective Phrase", image: backgroundImage },
    { id : 8, name: "Culture vocabulary Oxford 3000", image: backgroundImage },
  ];

  return (
    <Stack>
      {/* Sử dụng AppAppBar giống Dashboard */}
      <AppAppBar name="nvh0610" currentPage="category" />

      <Container maxWidth="lg">
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          textAlign="left"
          sx={{
            color: "#ff0000", // Màu chữ
            textDecoration: "underline", // Gạch chân
          }}
        >
          Categories
        </Typography>

        <Grid container spacing={6}>
          {categoryList.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: 6,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={item.image}
                  alt={item.name}
                />
                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Typography variant="h6" fontWeight="bold" textAlign="center" sx={{ mb: 2 , color: "#0e3fef"}}>
                    {item.name}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: "auto", // Đẩy button xuống đáy
                      bgcolor: "primary.main",
                    }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
            <Footer />
      
    </Stack>
  );
}
