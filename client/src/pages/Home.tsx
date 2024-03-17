import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Box, Container, Button } from "@mui/material";
import PostList from "../components/PostList"; // Adjust the import path as necessary

const Home: React.FC = () => {
  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Home Page
      </Typography>
      <Box marginY={4}>
        {/* Example button that navigates to a "Create Post" page */}
        <Button
          component={RouterLink}
          to="/create-post"
          variant="contained"
          color="primary"
        >
          Create Post
        </Button>
      </Box>
      <PostList />
    </Container>
  );
};

export default Home;
