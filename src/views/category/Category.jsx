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
import { useNavigate } from "react-router-dom";
import PaginationButtons from "../pagination/pagination";
import { useState } from "react";
import LimitSelect from "../../components/common/LimitSelect";
import SearchBox from "../../components/common/Search";

export default function Category() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangeLimit = (event) => {
    setLimit(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  const data = {
    pagination: {
      total_page: 10,
      limit: 10,
      page: 1,
    },
    categories: [
      {
        id: 1,
        name: "toeic user 2",
        created_at: "2025-03-01 13:50:21 +0700 +07",
        updated_at: "2025-03-01 13:50:21 +0700 +07",
      },
      {
        id: 2,
        name: "toeic user 2",
        created_at: "2025-03-01 15:58:04 +0700 +07",
        updated_at: "2025-03-01 15:58:04 +0700 +07",
      },
      {
        id: 3,
        name: "toeic user 2",
        created_at: "2025-03-01 15:58:06 +0700 +07",
        updated_at: "2025-03-01 15:58:06 +0700 +07",
      },
      {
        id: 4,
        name: "toeic user 2",
        created_at: "2025-03-01 15:58:07 +0700 +07",
        updated_at: "2025-03-01 15:58:07 +0700 +07",
      },
      {
        id: 5,
        name: "toeic user 2",
        created_at: "2025-03-01 15:58:08 +0700 +07",
        updated_at: "2025-03-01 15:58:08 +0700 +07",
      },
      {
        id: 6,
        name: "toeic user 2",
        created_at: "2025-03-01 15:58:09 +0700 +07",
        updated_at: "2025-03-01 15:58:09 +0700 +07",
      },
      {
        id: 7,
        name: "toeic user 2",
        created_at: "2025-03-01 15:58:09 +0700 +07",
        updated_at: "2025-03-01 15:58:09 +0700 +07",
      },
      {
        id: 8,
        name: "toeic user 2",
        created_at: "2025-03-01 15:58:10 +0700 +07",
        updated_at: "2025-03-01 15:58:10 +0700 +07",
      },
    ],
  };

  const handleNavigate = (id) => {
    navigate(`/category/${id}/vocabulary`);
  };

  return (
    <Stack>
      {/* Sử dụng AppAppBar giống Dashboard */}
      <AppAppBar name="nvh0610" currentPage="category" />

      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="left"
          sx={{
            textDecoration: "underline", // Gạch chân
            mt: 2,
            mb: 3,
            color: "#0e3fef",
          }}
        >
          Topic
        </Typography>
        {/* Select Boxes + Search */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={2}>
            <LimitSelect limit={limit} onChange={setLimit} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <SearchBox onSearch={handleSearch} />
          </Grid>
        </Grid>

        <Grid container spacing={6}>
          {data.categories.map((item, index) => (
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
                  image={item.image || backgroundImage}
                  alt={item.name}
                />
                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Typography
                    variant="h7"
                    fontWeight="bold"
                    textAlign="center"
                    sx={{ mb: 1, color: "#0e3fef" }}
                  >
                    {item.name}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: "auto", // Đẩy button xuống đáy
                      fontStyle: "arial",
                    }}
                    onClick={() => handleNavigate(item.id)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <PaginationButtons
          pagination={data.pagination}
          onPageChange={handleChangePage}
          sx={{ mt: 4 }}
        />
      </Container>
      <Footer />
    </Stack>
  );
}
